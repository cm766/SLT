import os
import tensorflow as tf
assert tf.__version__.startswith('2')

from mediapipe_model_maker import gesture_recognizer

import matplotlib.pyplot as plt

'''
train_dataset_path = 'dataset_coco/train'
validation_dataset_path = 'dataset_coco/validation'
test_dataset_path = 'dataset_coco/test'

train_data = gesture_recognizer.Dataset.from_folder(
    dirname=train_dataset_path,
    hparams=gesture_recognizer.HandDataPreprocessingParams()
)
validation_data = gesture_recognizer.Dataset.from_folder(
    dirname=validation_dataset_path,
    hparams=gesture_recognizer.HandDataPreprocessingParams()
)
test_data = gesture_recognizer.Dataset.from_folder(
    dirname=test_dataset_path,
    hparams=gesture_recognizer.HandDataPreprocessingParams()
)
'''

dataset_path = 'dataset_1'

labels = []
for i in os.listdir(dataset_path):
  if os.path.isdir(os.path.join(dataset_path, i)):
    labels.append(i)
print(labels)

NUM_EXAMPLES = 2

for label in labels:
  label_dir = os.path.join(dataset_path, label)
  example_filenames = os.listdir(label_dir)[:NUM_EXAMPLES]
  fig, axs = plt.subplots(1, NUM_EXAMPLES, figsize=(10,2))
  for i in range(NUM_EXAMPLES-1):
    axs[i].imshow(plt.imread(os.path.join(label_dir, example_filenames[i])))
    axs[i].get_xaxis().set_visible(False)
    axs[i].get_yaxis().set_visible(False)
  fig.suptitle(f'Showing {NUM_EXAMPLES} examples for {label}')

data = gesture_recognizer.Dataset.from_folder(
    dirname=dataset_path,
    hparams=gesture_recognizer.HandDataPreprocessingParams()
)
train_data, rest_data = data.split(0.8)
validation_data, test_data = rest_data.split(0.5)

hparams = gesture_recognizer.HParams(export_dir="exported_model", epochs=35, learning_rate=0.002, batch_size=16)
model_options = gesture_recognizer.ModelOptions(dropout_rate=0.3, layer_widths=[256, 128, 64])
options = gesture_recognizer.GestureRecognizerOptions(hparams=hparams)
model = gesture_recognizer.GestureRecognizer.create(
    train_data=train_data,
    validation_data=validation_data,
    options=options
)

loss, acc = model.evaluate(test_data, batch_size=1)
print(f"Test loss:{loss}, Test accuracy:{acc}")

model.export_model()
'''

# Define parameter ranges for exploration
dropout_rates = [0.3, 0.4, 0.5]
layer_widths = [[64, 32], [128, 64, 32], [256, 128, 64]]
learning_rates = [0.001, 0.003, 0.002]
batch_sizes = [16, 32, 64]
epochs = [30, 40, 20]

# Track best model and its parameters
best_model = None
best_params = {}
n = 0
l = []
best_paramsl = []
# Iterate through parameter combinations
for dropout_rate in dropout_rates:
    for epoch in epochs:
        for learning_rate in learning_rates:
            for batch_size in batch_sizes:
                for layer_width in layer_widths:
                    # Create and train the model
                    data = gesture_recognizer.Dataset.from_folder(
                        dirname=dataset_path,
                        hparams=gesture_recognizer.HandDataPreprocessingParams()
                    )
                    train_data, rest_data = data.split(0.8)
                    validation_data, test_data = rest_data.split(0.5)
                  
                    # Create model options and hyperparameters
                    model_options = gesture_recognizer.ModelOptions(
                        dropout_rate=dropout_rate, layer_widths=layer_width
                    ) 
                    n += 1
                    hparams = gesture_recognizer.HParams(
                        export_dir="exported_model_"+str(n)+"_ds1",
                        learning_rate=learning_rate,
                        batch_size=batch_size,
                        epochs=epoch,
                        # Consider adding other HParams here
                    )
                    options = gesture_recognizer.GestureRecognizerOptions(
                        model_options=model_options, hparams=hparams
                    )
                    model = gesture_recognizer.GestureRecognizer.create(
                        train_data=train_data,
                        validation_data=validation_data,
                        options=options
                    )

                    loss, acc = model.evaluate(test_data, batch_size=1)
                    print(f"Test loss:{loss}, Test accuracy:{acc}")
                    print(acc, dropout_rate, layer_width, learning_rate, batch_size, epoch)

                    # Track best model and parameters
                    if acc > 0.7:
                        best_params = {
                            "dropout_rate": dropout_rate,
                            "layer_widths": layer_width,
                            "learning_rate": learning_rate,
                            "batch_size": batch_size,
                            "epochs": epoch,
                        }
                        best_paramsl = [acc, dropout_rate, layer_width, learning_rate, batch_size, epoch]
                        #model.export_model()    
                        print("Best parameters:", best_params)
                        l.append(best_paramsl)
                        print(l)
                        # Optionally, export or use the best model
                        '''
                        
 
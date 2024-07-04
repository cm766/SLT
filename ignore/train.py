import os
import tensorflow as tf
assert tf.__version__.startswith('2')

from mediapipe_model_maker import gesture_recognizer

import matplotlib.pyplot as plt
import csv

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

hparams = gesture_recognizer.HParams(export_dir="exported_model_", epochs=100, learning_rate=0.003, batch_size=16)
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
dropout_rates = [0.3]
layer_widths = [[256, 128, 64]]  #, [64, 32], [32, 16], [128, 64, 32, 16], [128, 64, 32], [64, 32, 16], [256, 128, 64, 32], [1024, 516, 256, 128, 64]]
learning_rates = [0.003]  # 0.002, 0.1, 0.01
batch_sizes = [16]  # 32, 64, 8, 4
epochs = [100]


# Track best model and its parameters
best_model = None
best_params = {}
n = 0
l = []
best_paramsl = []
best_accuracy = 0.0

# Iterate through parameter combinations
for dropout_rate in dropout_rates:
    for layer_width in layer_widths:
        for batch_size in batch_sizes:
            for learning_rate in learning_rates:
                for epoch in epochs:
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

                    #if acc < best_accuracy:
                       #break

                    # Track best model and parameters
                    if acc > 0.9:
                        best_params = {
                            "dropout_rate": dropout_rate,
                            "layer_widths": layer_width,
                            "learning_rate": learning_rate,
                            "batch_size": batch_size,
                            "epochs": epoch,
                        }
                        best_paramsl = [acc, dropout_rate, layer_width, learning_rate, batch_size, epoch, n]
                        #model.export_model()

                        # Open a CSV file for writing
                        with open("best_parameters.csv", "wb") as f:
                            writer = csv.writer(f)


                            # Write the best parameters
                            writer.writerow([acc, best_params["dropout_rate"], best_params["layer_widths"], best_params["learning_rate"], best_params["batch_size"], best_params["epochs"]])

                        print("Best parameters exported to best_parameters.csv")
                        # Optionally, export or use the best model
                        
                        model.export_model()
'''
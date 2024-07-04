# TRADUCTOR LSA
#### Video Demo:
#### Description: 

This web application facilitates the translation of Argentinian Sign Language gestures into Spanish text using fingerspelling recognition.

1. Main algorithm: Upon successful model loading and camera activation, the algorithm begins processing video frames. Each captured frame is analysed by the loaded model. If hands are detected and a sign is recognized, the model outputs a vector for each detected hand containing the predicted sign name and its corresponding confidence score (accuracy). The recognized sign is considered a potential letter. If the same sign is consistently predicted for a predefined duration (e.g., 1 second), the letter is appended to the "translated text" displayed to the user. Conversely, if the predicted sign changes, the new sign becomes the potential prediction. Furthermore, it is also possible to delete characters and to add a space. For this purpose there are two buttons positioned in the top right corner of the video display. When the tip of the index finger (landmark 8) touches a designated virtual button area, the corresponding action is triggered. This is achieved by verifying if the landmark's coordinates fall within the predefined boundaries of the buttons.
On the another hand, it is also possible to delete a character or to add an space. For this purpose two bottons are added in the upper right corner on the video box, when the landmark 8 (the one that corresponds to the index finger tip) is on one of the virtual buttons the corresponding action is executed. This if verified taking the coordinates of landmark 8 and verifying that they are beetween the coordinates of the edges of a button.
1. There are two page user interfaces. The home page presents the application's logo, a breaf description of its functionality, and basic instructions. The translation page counts with a signs menu that showcases all recognized fingerspelling signs. Hovering over a specific sign enlarges it for better reference. Additionally, there is a help section with some hints and a link back to the home page's instructions. On the other hand, the interface language can be toggled between English and Spanish, while translation functionality remains exclusive to Argentinian Sign Language.
1. Correct prediction function: Due to model's inaccuracy there are some mistakes in the sign prediction, the sign that corresponds to letter "b" is recognized as a "j" and viceverse, the same happens with "c" and "f" signs. "x" and "t" are both recognized as "t" and "q" and "o" are often confused. The correctPrediction function takes as input the original prediction and change it based on the previus analisys. 
1. Mediapipe implementation: [Mediapipe](https://mediapipe-studio.webapps.google.com/home), a framework designed for building multi-modal machine learning pipelines, is employed for gesture recognition within the application. The following functionalities are imported from Mediapipe:
    - GestureRecognizer: This module facilitates the recognition of hand gestures.
    - FilesetResolver: This module aids in resolving file paths for accessing necessary resources.
    - DrawingUtils: This module provides utilities for visualising results on the video frame.

The application utilises a custom-trained Mediapipe regression model for sign prediction. 
1. Model: The model was trained on a custom dataset which was created taking into consideration factors like ilumination, backgrounds and implementing techniques such as data argumantation in order to improve generalisation. Over fifty models were trained and evaluated, with the final selection based on prediction accuracy. The training process involved optimising various parameters, including:
    - Epochs: The number of times the entire training dataset was passed through the model during training.
    - Learning Rate: The rate at which the model adjusts its internal parameters based on the error observed during training.
    - Batch Size: The number of samples processed by the model before updating its internal parameters.
    - Number and Widths of Layers: The architecture of the neural network, including the number of hidden layers and the number of units within each layer.
    - Dropout Rate: A regularisation technique that randomly drops a certain proportion of neurons during training to prevent overfitting.

The final configuration employed the following hyperparameters:
+ dropout_rate: 0.3
+ layer_widths: [256, 128, 64] (list representing the number of units in each hidden layer)
+ learning_rate: 0.001
+ batch_size: 32
+ epochs: 50



Translator and index
    description of the layout
        The layout was designed based on the idea of adaptivity.
        Accesibility might need to be improved (INVESTIGATE)
    decisions and changes
        About some elements:
            Alphabet sign languge menu (check out name)
                Contains the alphabetical signs. 
                When pointer is hover a bigger image is shown
                It isnt hiden until the sign button is clicked again so people is
                 able to check signs while fingerspelling.
            Home page
                Introduce the project and its purpuse.
                Algo contains a few basic usage instructions.
    libraries implemented
        Bootstrap
App
    Description of the behavour (simply deal with the templates)
    Add description of the language haldle and the reason for such choice
        When request to change the source idiom arrives the program re load the
         template passing the selection. Jinja syntax.
        The reason for this implementation is that it is an Argentinian sign 
         language translator while the project if for an english course. 

Script
    Mention mediapipe implementations (imports)
        Mediapipe is an open-source framework for building and deploying 
         machine-learning pipelines. I re-trained a mediapipe model.
    Behavour of the algorithm
        first enables webcam
        check if new framework is avaiable and stores it in a variable. if a hand is detected the landmark is shown.
        if a letter is recognized it is shown to the user and latter added to the text if the letter detected is the same for 1'.
        In order to do that two variable are implemented. char is updated every framework and char0, every time a different variable is detected.
        if the difference between the last time char0 was updated and the current time         
    Detection settings
    Funcionality of the mediapipe imports
        GestureRecognizer 
        FilesetResolver 
        DrawingUtils

        GestureRecognizer: This class is the core component for gesture recognition. It allows you to load a pre-trained machine learning model that can identify specific hand gestures from video input. You can configure the model to use the CPU or GPU for processing, and specify the number of hands to track in the video.

        FilesetResolver: This class helps you manage the resources needed by the MediaPipe models. It takes care of resolving the location of the model files and ensures they are loaded correctly. In web-based applications, it might fetch the model files from a remote server.

        DrawingUtils: This class provides utility functions for visualizing the results of MediaPipe tasks. This could include drawing landmarks detected on the hand or highlighting recognized gestures on the video frame.

        Interactivity with templates

helpers
    Explain the purpuse of each function
    correctPrediction: due to an inaccuracy issue this function is implemented to correct it based on some previous investigation 
    drawButtons: draws the space and delete buttons shapes onto the canvas 
    checkClickButtons: detect when a buton is clicked and returns its index
    clickedButton: change the color of the button when its clicked

Model Training 
    Library implemented: mediapipe 
    Mention the discarted options
    Dataset search: the original idea was to use the LSA dataset, formed by ??? videos. But as it didnt fit with the requirements of the project i create my own dataset.
    add characteristics of the dataset.
    Creation of the dataset and techniches implemented: background, different persons, data argumentation.
    Best models results and final choice. Explain reason. 

Future intentions
    3d animation
    ASL translator with words
Translator and index
    description of the layout
        The layout was designed based on the idea of adaptivity.
        Accesibility migh need to be improved (INVESTIGATE)
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
    Detection settings
    Funcionality of the mediapipe imports
    Interactivity with templates

helpers
    Explain the purpuse of each function
    "correctPrediction()"

Model Training
    Library implemented
    Mention the discarded options 
    Dataset search
    Creation of the dataset and techniches implemented
    Best models results and final choice. Explain reason.

Future intentions
    3d animation
    ASL translator with words
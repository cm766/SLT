import cv2 as cv
import os
import time
import uuid

imgPath = '/home/carolina/slt/slr/dataset/'

while True:
    label = input('label: ')
    dirList = os.listdir('dataset/')
    if label not in dirList:
        os.mkdir(imgPath + label)
        print('creating dir')
    cap = cv.VideoCapture(-1)

    while True:
        print('starting cap for {label}')
        time.sleep(3)
        ret, frame = cap.read()
        imgName = os.path.join(imgPath, label, label + '_' + '().jpg'.format(str(uuid.uuid1())))
        cv.imwrite(imgName, frame)
        cv.imShow('frame', frame)
        if input('?: ') == '0':
            break

    if cv.waitKey(1) & 0xFF == ord('q'):
        break
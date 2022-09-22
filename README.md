# vr-websockets
Controlling VR images via websockets

Hosted [here](https://safe-castle-04334.herokuapp.com/)

Detailed report on the technology [here](https://docs.google.com/document/d/10Svd00sijlKLkJ3iX3c3YjnjOMyi60ZGk4AUu3CEExk/edit?usp=sharing)

Uses Node.js, Express.js, Pannellum.js

## Usage

(The viewer and controller \[Admin] need to be active on their browser windows concurrently)

- Infospot Addition: Admin can enter the text for the infospot in the textbox and click on the image at the location where they desire to place the infospot. If the textbox is blank, the site displays an alert.

- Previous Infospot Deletion: Admin can click on ‘Delete Previous Infospot’ to delete the last placed infospot. Doing so multiple times will result in infospots being deleted in succession.

- Easy Return to Presenter View: Should the viewer stray from the presentation by panning the image by themself, or by late joining or refreshing the page by mistake, they can click on ‘Revert to Presenter View’ to realign with the main presentation. Admin also has control of this function.

- Auto Rotate: Admin can enable or disable the option to have a smooth rotation of the equirectangular image.
Return to Initial Position: Admin can bring the image to its initial position for all viewers.

- Scene Change: Admin can choose from three given equirectangular VR images. Changes are reflected across all viewers.

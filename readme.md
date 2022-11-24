# Image Slider
## Description
This is a simple image slider that can be used to display images in a slideshow format. It is built using TypeScript.  
You can use it in any layout, in this example I have used it in a full page layout.  
The test requirement mentionned that I could solve bugs, I found that the drag and drop not snaping to the nearest image is a UX bug so I added it.  
I kept it simple, as it stands now, if you try to drag and drop very quickly (quicker than 3 times a second) you could see a kind of double jump, it's not a big deal but I just want to clarify that I know about it.

## How to build
1. Clone the repository
2. Run `npm install` to install the dependencies
3. Run `npm run build` to build the project
4. Run `npm run serve` to start the test server
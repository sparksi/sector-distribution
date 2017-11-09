# Images

## This project uses a combination of automatically generated sprites, manually generated sprites and regular images.

### Automatically generated sprites

This project [automatically creates svg sprites using gulp and Sass](https://www.liquidlight.co.uk/blog/article/creating-svg-sprites-using-gulp-and-sass/).

To upload new svgs add them to the `../build/sprites/` directory then run `npm run gulp` at the theme root.

Be aware to:

- Make sure your new file permissions allow everyone to read and write.
- Make sure your new svg is sized in round pixels.

### Manually generated sprites

- eg: sprite--file-type-icons.png
- Photoshop templates to create new and/or modify existing sprites are included in ../images/templates/

### Regular images

- Other general images are included in the root images directory.

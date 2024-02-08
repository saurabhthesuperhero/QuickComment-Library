### README.md 

# QuickComment

QuickComment is a lightweight, easy-to-integrate comment system designed for static websites or blogs. It allows site owners to effortlessly add a comment section to any webpage with minimal setup. Developed with simplicity and ease of use in mind, QuickComment leverages PHP for backend functionality and JavaScript for a dynamic, user-friendly frontend experience.

## Features

- **Easy to Integrate**: Simply drop the QuickComment folder into your project, and include a script tag in your HTML.
- **No External Dependencies**: Built with vanilla JavaScript and PHP, eliminating the need for any additional libraries or frameworks.
- **Fully Customizable**: Tailor the look and feel of your comment section to fit your site's aesthetics.
- **Responsive Design**: Ensures a seamless experience across desktop and mobile devices.

## Prerequisites

To use QuickComment, your server must support:
- PHP 7.4 or higher
- A MySQL database

## Installation

### Step 1: Clone or Download

Clone this repository into your project directory, or download the ZIP and extract it.

git clone https://github.com/saurabhthesuperhero/QuickComment-Library.git

### Step 2: Database Setup

1. Create a MySQL database for QuickComment.
2. Run Following SQL into Database:

```
CREATE TABLE comments (
    id INT(11) NOT NULL AUTO_INCREMENT,
    post_url VARCHAR(255) DEFAULT NULL,
    name VARCHAR(100) DEFAULT NULL,
    email VARCHAR(100) DEFAULT NULL,
    comment TEXT DEFAULT NULL,
    posted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```


### Step 3: Configure Database Connection

Open `commentHandler.php` and update the database connection settings with your own details:

```php
$host = 'your_database_host';
$dbname = 'your_database_name';
$username = 'your_database_username';
$password = 'your_database_password';
```



### Step 4: Configure Paths in commentSystem.js

Before including QuickComment in your site, you need to adjust the file paths in `commentSystem.js` to match the location of your QuickComment files relative to your blog or webpage where the comment system will be used.

Open `commentSystem.js` and locate the following lines at the beginning of the file:

```javascript
// File paths as variables
const commentSystemUIPath = 'commentSystemUI.html';
const commentHandlerPath = 'commentHandler.php';
```

Adjust these paths to point to the correct location of `commentSystemUI.html` and `commentHandler.php` relative to the HTML file where you're including the comment system. For example, if your QuickComment folder is in the root directory and your blog is inside a `blog` subdirectory, you might change the paths to:

```javascript
// File paths as variables
const commentSystemUIPath = '../QuickComment/commentSystemUI.html';
const commentHandlerPath = '../QuickComment/commentHandler.php';
```

This configuration ensures that your webpage can correctly locate and use the QuickComment UI and backend handler regardless of the directory structure of your project.

### Step 5: Include QuickComment in Your Site

After configuring the paths in `commentSystem.js`, add the following lines to the HTML of the page where you want the comment system to appear:

```html
<script src="path/to/QuickComment/commentSystem.js"></script>
<div id="comment-system"></div>
```

Replace `path/to/QuickComment/` with the actual path to the QuickComment folder in your project. This path should be relative to the location of the HTML file into which you are integrating the comment system.

For instance, if your HTML file is located in the same directory as the QuickComment folder, the path would simply be `QuickComment/commentSystem.js`. If your HTML file is in a different directory, adjust the path accordingly to ensure it correctly points to the location of the `commentSystem.js` file.

## Usage

Once installed, QuickComment is ready to use. Visitors to your site can start adding comments immediately, and existing comments will be displayed in the designated area.

## Customization

You can customize the appearance of the comment section by modifying the CSS in `commentSystemUI.html` or by overriding these styles in your site's CSS files.

## Contributing

Contributions to QuickComment are welcome! Feel free to fork the repository, make your changes, and submit a pull request.

## License

QuickComment is released under the MIT license. See the LICENSE file for more details.


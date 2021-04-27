<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wallstreet Clicker</title>
    <link rel="stylesheet" href="style/style.css">
</head>

<body>
    <div class="interface">
        <div class="valueDisplayerParent">
            <div class="valueDisplayer">
                <div class="CurrentMone">
                    <h1>Mone: </h1>
                    <h1 id="CurrentMoneDisplay"></h1>
                </div>
            </div>
        </div>
        <div class="shop">
            <h3 id="shopTitle" class="title">|Shop|</h3>
        </div>
    </div>

    <div id="mainClicker" class="mainClicker" onclick="game.clickedClicker()"></div>

</body>

<script type="module" defer src="./js/main.js"></script>

</html>
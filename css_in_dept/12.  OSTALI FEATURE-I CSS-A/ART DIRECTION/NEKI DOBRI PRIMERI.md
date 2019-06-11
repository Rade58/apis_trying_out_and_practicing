# DOBRI PRIMERI U KOJIMA SE KORISTE FILTERI I BACKGROUND BLEND MODE

## NEON LIGHT SIGN

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <header></header>

    <div class="wrapper">

        <div class="neon-wrapper">
            <span class="txt">rade</span>
            <span class="gradient"></span>
            <span class="dodge"></span>
        </div>

    </div>

    <style>

        .wrapper {
            height: 800px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #000000;
        }

        .txt {
            color: #ffffff;
            background-color: #000000;
            font-size: 200px;
            font-weight: bold;
            font-family: Arial;
            text-transform: uppercase;
        }

        .neon-wrapper {
            display: inline-flex;

            filter: brightness(200%);
            overflow: hidden;

        }

        .txt::before {
            content: "rade";
            position: absolute;
            mix-blend-mode: difference;
            /* font-size: 198px; */
            filter: blur(3px);
        }

        .gradient {
            background-image: linear-gradient(115.87819175537379deg, rgba(248, 188, 79,1) 5.273809523809524%,rgba(211, 21, 87,1) 97.17857142857142%);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;

            mix-blend-mode: multiply;

            /* box-sizing: border-box; */
        }

        .dodge {
            background-image: radial-gradient(circle, white, black 30%);
            background-position: center;
            background-size: 25% 25%;
            position: absolute;
            top:-100%;
            left:-100%;
            right:0;
            bottom:0;

            mix-blend-mode: color-dodge;

            animation: dodge-area 3s linear infinite;
        }

        @keyframes dodge-area {
            to {
                transform: translate(50%,50%);
            }
        }


    </style>
</body>
</html>
```
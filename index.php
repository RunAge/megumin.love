<?php
ob_start();
include('includes/cache_counter.php');
$currentCount = ob_get_clean();
?>
    <!doctype HTML>
    <html lang="en">

    <head>
        <meta charset="utf-8">
        <!--FACEBOOK-->
        <meta property="og:title" content="Megumin is love">
        <meta property="og:site_name" content="Megumin is love">
        <meta property="og:url" content="https://megumin.love">
        <meta property="og:description" content="Fansite about best girl Megumin from the anime called 'Kono Subarashii Sekai ni Shukufuku wo!'">
        <meta property="og:type" content="website">
        <meta property="og:locale" content="en_US">
        <!--TWITTER-->
        <meta property="twitter:card" content="summary">
        <meta property="twitter:title" content="Megumin is love">
        <meta property="twitter:description" content="Fansite about best girl Megumin from the anime called 'Kono Subarashii Sekai ni Shukufuku wo!'">
        <meta property="twitter:creator" content="@robflop98">
        <meta property="twitter:url" content="https://megumin.love">
        <meta name="keywords" content="megumin, love, konosuba, best girl, best, girl, anime">
        <meta name="description" content="Fansite about best girl Megumin from the anime called 'Kono Subarashii Sekai ni Shukufuku wo!'">
        <title>Megumin is love</title>
        <link rel="icon" href="favicon.ico" type="image/x-icon">
        <link rel="stylesheet" href="css/style.css">
        <link href='https://fonts.googleapis.com/css?family=Courgette' rel='stylesheet' type='text/css'>
    </head>

    <body>
        <div id="navbar-slide">
            <img src="/images/hangumin.png" alt="Megumin Sidebar" />
            <div id="navbar-slide-inner">
                <h2 id="megsquad">Megumin Squad assemble!</h2>
                <p>Be sure to also visit the following Sites:</p>
                <p>-><a href="http://megum.in">megum.in</a> by Kagumi</p>
                <p>-><a href="https://cerx.pw/megumin">cerx.pw/megumin</a> by Cerx</p>
                <p>-><a href="http://megumin.pw">megumin.pw</a> by (?)</p>
                <hr>
                <p>Also, feel free to contact me <a href="https://www.reddit.com/message/compose/?to=robflop&subject=megumin.love">on reddit</a>
                    <br>or under <a href="mailto:robflop@megumin.love">robflop@megumin.love</a>.</p>
            </div>
        </div>
        <div id="box" style="display:none;">
            <div id="counter">
                <?php echo $currentCount; ?>
            </div>
            <button id="button">やめろ!!</button>
            <a href="version.html" id="version">[ver. P3]</a>
            <span id="share-buttons">
            <a href="https://twitter.com/intent/tweet?text=New%20Megumin%20Fansite%21%20Check%20it%20out%21&via=robflop98&url=https%3A%2F%2Fmegumin.love" onclick="window.open(this.href, '', 'width=650, height=450, menubar=no, toolbar=no, scrollbars=yes'); return false;">
            <img src="/images/twitter.png" alt="Tweet on Twitter" /></a>
            <a href="https://www.facebook.com/sharer.php?u=https://megumin.love" onclick="window.open(this.href, '', 'width=650, height=450, menubar=no, toolbar=no, scrollbars=yes'); return false;">
            <img src="/images/facebook.png" alt="Share on Facebook" /></a>
            <a href="https://www.reddit.com/submit?url=https://megumin.love;title=megumin.love" target="_blank">
            <img src="/images/reddit.png" alt="Submit to Reddit"></a>
            </span>
        </div>

        <footer>
            <p>Created and maintained by robflop<a id="credits" href="credits.html"> -> Credits</a></p>
        </footer>

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.3/jquery.min.js"></script>
        <script src="js/count.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/ion-sound/3.0.7/js/ion.sound.min.js"></script>
        <script src="js/googleanalytics.js"></script>
    </body>

    </html>
/**
 * Created by patchouni on 01/02/2016.
 */

(function($) {
    $.fn.puissance = function(options)
    {
        var grid = options.grid ? options.grid : [7, 6];
        var color = options.color ? options.color : ["red", "yellow"];
        var background = options.background ? options.background : ["blue"];
        var width = (122 * grid[0]) + 20;

        function createGrid(grid) {
            for (var i = 1; i <= grid[1]; i++) {
                for (var j = 1; j <= grid[0]; j++) {
                    $('#puissance').append('<div data-state=empty data-x="' + j +'" data-y="' + i +'" class="rond"></div>');
                }
            }
            $('#puissance').before('<div class="header"><h1>Puissance 4</h1><h2 class="tour"></h2></div>');
            $('.header').after('<div class="score"><button type="button">Reset score</button><p class="j1">Joueur 1 : 0</p><p class="j2">Joueur 2 : 0</p></div>');
        }

        function resetScore(j1, j2) {
            j1 = 0;
            j2 = 0;
        }


        function setCSS(){
            $('#puissance').css('border', '1px solid black').css('padding', '10px').css('background-color', background[0]).css("margin", "0px auto").css("width", width+'px').css('border-radius', "10px");
            $('.rond').css('border', '2px solid red').css('height', "100px").css('width', "100px").css('border-radius', "100px").css('background-color', 'black').css('margin', '10px').css('display', 'inline-block').css('position', 'relative');
        }

        function clearRond(){
            $( ".pi" ).remove();
            $('.rond').data('state', 'empty');
        }

        function play() {
            var played = 1;
            var j1 = 0;
            var j2 = 0;

            $('.rond').on('click', function ()
            {
                var yLast = grid[1];

                var x = $(this).data('x');
                var y = $(this).data('y');
                var current_player = played % 2;
                var next_player = (played + 1) % 2;

                var tour = next_player == 0 ? "1" : "2";
                var current = current_player == 0 ? "1" : "2";

                while ($('[data-x=' + x + '][data-y=' + yLast + ']').data('state') != "empty" && yLast > 0)
                    yLast--;

                $('[data-x=' + x + '][data-y=' + yLast + ']').data('state', current_player).append('<div class="pi" id="pion-'+ played + '"></div>');
                $('#pion-' + played).css("height", "100px").css("width", "100px").css("border-radius", "50px").css('background-color', color[next_player]).css('position', 'absolute');
                $('#pion-' + played).css('top', '-600%');
                $('#pion-' + played).animate({ top: "0%" }, "slow" );



                if (check(x, yLast, y, current_player, current))
                {
                    alert("Le joueur " + current + " a gagné");
                    played = 0 + next_player;
                    current == 1 ? j1+=1 : j2+=1;
                    $('.j1').text("joueur 1: " + j1 );
                    $('.j2').text("joueur 2: " + j2 );
                    clearRond();
                }

                else if(yLast > 0) {
                    played++;
                    $('.rond').css('border', '2px solid '+color[current_player]);
                    $('h2').text("Au tour du joueur " + tour);
            }

                if (played == (grid[1] * grid[0]))
                    alert("null");

            });
        }

        function check(x, yLast, y, current_player, current)
        {
            var win = false;
            var yV = yLast + 1;

            /* bas vers le haut */
            if (!win) {
                if (yLast <= grid[1] - 3) {

                    for (var i = yV; i < yV + 3 && $('[data-x=' + x + '][data-y=' + i + ']').data('state') == current_player; i++);
                    if (i == yV + 3)
                        win = current;
                }
            }
            /* diagonal droite bas */
            if (!win)
            {
                var addDX = x + 1;
                var addY = yLast - 1;

                if(x <= grid[0] + 3 && yLast <= grid[1] + 3)
                {
                    for (var i = addDX, j = addY; i < addDX + 3 && j > addY - 3 && $('[data-x=' + i + '][data-y=' + j + ']').data('state') == current_player; i++, j--);
                    if(i == addDX + 3 && j == addY - 3)
                        win = current;
                }

                if(!win)
                {
                    var addDX = x - 1;
                    var addY = yLast + 1;

                    if(x <= grid[0] + 3 && yLast <= grid[1] + 3)
                    {
                        for (var i = addDX, j = addY; i < addDX + 3 && j > addY - 3 && $('[data-x=' + i + '][data-y=' + j + ']').data('state') == current_player; i++, j--);
                        if(i == addDX + 4 && j == addY - 4)
                            win = current;
                    }
                }
            }
            /* diagonal gauche bas */
            if (!win)
            {
                var subDX = x - 1;
                var addY = yLast - 1;

                if(x >= grid[0] - 3 && yLast <= grid[1] + 3)
                {
                    for (var i = subDX, j = addY; i < subDX + 3 && j > addY - 3 && $('[data-x=' + i + '][data-y=' + j + ']').data('state') == current_player; i--, j--);
                    if(i ==subDX - 3 && j == addY - 3)
                        win = current;
                }

                if(!win){
                    var subDX = x + 1;
                    var addY = yLast + 1;

                    if(x >= grid[0] - 3 && yLast <= grid[1] + 3)
                    {
                        for (var i = subDX, j = addY; i < subDX + 3 && j > addY - 3 && $('[data-x=' + i + '][data-y=' + j + ']').data('state') == current_player; i--, j--);
                        if(i ==subDX - 4 && j == addY - 4)
                            win = current;
                    }
                }
            }
            /* diagonal droite haut */
            if (!win)
            {
                var addDX = x + 1;
                var addY = yLast + 1;

                if(x <= grid[0] + 3 && yLast <= grid[1] - 3)
                {
                    for (var i = addDX, j = addY; i < addDX + 3 && j < addY + 3 && $('[data-x=' + i + '][data-y=' + j + ']').data('state') == current_player; i++, j++);
                    if(i == addDX + 3 && j == addY + 3)
                        win = current;
                }

                if(!win)
                {
                    var addDX = x - 1;
                    var addY = yLast - 1;

                    if(x <= grid[0] + 4 && yLast <= grid[1] - 4)
                    {
                        for (var i = addDX, j = addY; i < addDX + 3 && j < addY + 3 && $('[data-x=' + i + '][data-y=' + j + ']').data('state') == current_player; i++, j++);
                        if(i == addDX + 4 && j == addY + 4)
                            win = current;
                    }
                }
            }
            /* diagonal gauche haut */
            if (!win)
            {
                var subDX = x - 1;
                var addY = yLast + 1;

                if(x >= grid[0] - 3 && yLast <= grid[1] + 3)
                {
                    for (var i = subDX, j = addY; i < subDX + 3 && j < addY + 3 && $('[data-x=' + i + '][data-y=' + j + ']').data('state') == current_player; i--, j++);
                    if(i == subDX - 3 && j == addY + 3)
                        win = current;
                }
                if(!win){
                    var subDX = x + 1;
                    var addY = yLast - 1;

                    if(x >= grid[0] - 4 && yLast <= grid[1] + 4)
                    {
                        for (var i = subDX, j = addY; i < subDX + 3 && j < addY + 3 && $('[data-x=' + i + '][data-y=' + j + ']').data('state') == current_player; i--, j++);
                        if(i == subDX - 4 && j == addY + 4)
                            win = current;
                    }
                }
            }
            /* gauche vers la droite */
            if (!win)
            {
                var subX = x - 1;

                if (x >= grid[0] - 3)
                {
                    for (var i = subX; i < subX + 3 && $('[data-x=' + i + '][data-y=' + yLast + ']').data('state') == current_player; i--);
                    if (i == subX - 3)
                        win = current;

                }

                if(!win) {

                    var subX = x + 1;

                    if (x >= grid[0] - 3)
                    {
                        for (var i = subX; i < subX + 3 && $('[data-x=' + i + '][data-y=' + yLast + ']').data('state') == current_player; i--);
                        if (i == subX - 4)
                            win = current;
                    }
                }
            }
            /* droite vers la gauche */
            if (!win)
            {
                var addX = x + 1;

                if (x <= grid[0] + 3)
                {
                    for (var i = addX; i > addX - 3 && $('[data-x=' + i + '][data-y=' + yLast + ']').data('state') == current_player; i++);
                    if (i == addX + 3)
                        win = current;
                }
            }

            if(!win) {
                var addX = x - 1;

                if (x <= grid[0] + 3) {
                    for (var i = addX; i > addX - 3 && $('[data-x=' + i + '][data-y=' + yLast + ']').data('state') == current_player; i++);
                    if (i == addX + 4)
                        win = current;
                }
            }
            if(win) {
                return true;
            }
        }

        createGrid(grid);
        setCSS();
        play();
    };
})(jQuery);
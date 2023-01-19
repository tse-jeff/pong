let gameState = 'start';

// board
let board = document.querySelector('.board');
let score_1 = document.querySelector('.player_1_score');
let score_2 = document.querySelector('.player_2_score');
let message = document.querySelector('.message');
let board_coord = board.getBoundingClientRect();

// paddles
let paddle_1 = document.querySelector('.paddle_1');
let paddle_2 = document.querySelector('.paddle_2');
let paddle_1_coord = paddle_1.getBoundingClientRect();
let paddle_2_coord = paddle_2.getBoundingClientRect();
let paddle_1_velocity = 0;
let paddle_2_velocity = 0;
let paddle_common =
    document.querySelector('.paddle').getBoundingClientRect();

// ball
let initial_ball = document.querySelector('.ball');
let ball = document.querySelector('.ball');
let initial_ball_coord = ball.getBoundingClientRect();
let ball_coord = initial_ball_coord;

// reset ball
let dx = Math.floor(Math.random() * 4) + 3;
let dy = Math.floor(Math.random() * 4) + 3;
let dxd = Math.floor(Math.random() * 2);
let dyd = Math.floor(Math.random() * 2);

// user input
document.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        gameState = gameState == 'start' ? 'play' : 'start';
        if (gameState == 'play') {
            message.innerHTML = 'Game Started';
            message.style.left = 42 + 'vw';
            requestAnimationFrame(() => {
                dx = Math.floor(Math.random() * 4) + 3;
                dy = Math.floor(Math.random() * 4) + 3;
                dxd = Math.floor(Math.random() * 2);
                dyd = Math.floor(Math.random() * 2);
                moveBall(dx, dy, dxd, dyd);
            });
        }
    }
    if (gameState == 'play') {
        // attempt to make paddle more smooth
        if (e.key == 'w') {
            paddle_1_velocity = -5;
        }
        if (e.key == 's') {
            paddle_1_velocity = 5;
        }
        if (e.key == 'ArrowUp') {
            paddle_2_velocity = -5;
        }
        if (e.key == 'ArrowDown') {
            paddle_2_velocity = 5;
        }
    }
});

// attempt to make paddle more smooth
document.addEventListener('keyup', (e) => {
    if (e.key == 'w' || e.key == 's') {
        paddle_1_velocity = 0;
    }
    if (e.key == 'ArrowUp' || e.key == 'ArrowDown') {
        paddle_2_velocity = 0;
    }
});

// update paddle position
function updatePaddle() {
    paddle_1_coord.y = Math.max(
        board_coord.top,
        Math.min(
            board_coord.bottom - paddle_common.height,
            paddle_1_coord.y + paddle_1_velocity
        )
    );
    paddle_1.style.top = Math.max(
        board_coord.top,
        Math.min(
            board_coord.bottom - paddle_common.height,
            paddle_1_coord.y
        )
    ) + 'px';
paddle_2_coord.y = Math.max(
    board_coord.top,
    Math.min(
        board_coord.bottom - paddle_common.height,
        paddle_2_coord.y + paddle_2_velocity
    )
);
paddle_2.style.top = Math.max(
    board_coord.top,
    Math.min(
        board_coord.bottom - paddle_common.height,
        paddle_2_coord.y
    )
) + 'px';
    requestAnimationFrame(updatePaddle);
}
requestAnimationFrame(updatePaddle);

// update ball position
function moveBall(dx, dy, dxd, dyd) {
    if (ball_coord.top <= board_coord.top) {
        dyd = 1;
    }
    if (ball_coord.bottom >= board_coord.bottom) {
        dyd = 0;
    }
    if (
        ball_coord.left <= paddle_1_coord.right &&
        ball_coord.top >= paddle_1_coord.top &&
        ball_coord.bottom <= paddle_1_coord.bottom
    ) {
        dxd = 1;
        dx = Math.floor(Math.random() * 4) + 3;
        dy = Math.floor(Math.random() * 4) + 3;
    }
    if (
        ball_coord.right >= paddle_2_coord.left &&
        ball_coord.top >= paddle_2_coord.top &&
        ball_coord.bottom <= paddle_2_coord.bottom
    ) {
        dxd = 0;
        dx = Math.floor(Math.random() * 4) + 3;
        dy = Math.floor(Math.random() * 4) + 3;
    }
    if (
        ball_coord.left <= board_coord.left ||
        ball_coord.right >= board_coord.right
    ) {
        if (ball_coord.left <= board_coord.left) {
            score_2.innerHTML = +score_2.innerHTML + 1;
        } else {
            score_1.innerHTML = +score_1.innerHTML + 1;
        }
        gameState = 'start';

        ball_coord = initial_ball_coord;
        ball.style = initial_ball.style;
        message.innerHTML = 'Press Enter to Play Pong';
        message.style.left = 38 + 'vw';
        return;
    }
    ball.style.top = ball_coord.top + dy * (dyd == 0 ? -1 : 1) + 'px';
    ball.style.left = ball_coord.left + dx * (dxd == 0 ? -1 : 1) + 'px';
    ball_coord = ball.getBoundingClientRect();
    requestAnimationFrame(() => {
        moveBall(dx, dy, dxd, dyd);
    });
}
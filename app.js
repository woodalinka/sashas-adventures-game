document.addEventListener('DOMContentLoaded', () => {
    const sasha = document.querySelector('.sasha');
    const grid = document.querySelector(".grid");
    const alert = document.getElementById('alert')
    let gravity = 0.9
    let isJumping = false;
    let isGameOver = false;
    let obstacleCount = 0

    function control(e) {
        if (e.code === "Space") {
            if (!isJumping) {
                jump()
            }
        }
    }

    document.addEventListener('keyup', control)

    let position = 0

    function jump() {
        isJumping = true
        let count = 0
        let timerId = setInterval(() => {
            //move down
            if (count === 15) {
                clearInterval(timerId)
                let downTimerId = setInterval(() => {
                    if (count === 0) {
                        clearInterval(downTimerId)
                        isJumping = false
                    }
                    position -= 5
                    count--
                    position = position * gravity
                    sasha.style.bottom = position + 'px'
                }, 20)
            }
            // move up
            position += 30
            count++
            position = position * gravity;
            sasha.style.bottom = position + 'px'
        }, 20)
    }

    function generateObstacles() {
        if (!isGameOver) {
            let randomTime = Math.random() * (4000 - 500) + 500;

            console.log(randomTime)
            const obstacle = document.createElement('div')
            let obstaclePosition = 1000;
            obstacle.classList.add('obstacle')
            grid.appendChild(obstacle)
            obstacle.style.left = obstaclePosition + 'px'

            let timerId = setInterval(() => {
                if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
                    clearInterval(timerId)

                    alert.style.visibility = "visible"
                    isGameOver = true;

                    //remove all children
                    while (grid.firstChild) {
                        grid.removeChild(grid.lastChild)
                    }
                }

                obstaclePosition -= 10;
                obstacle.style.left = obstaclePosition + 'px'

                if (obstaclePosition < 0) {
                    clearInterval(timerId);
                    grid.removeChild(obstacle)
                    obstacleCount++
                    console.log(obstacleCount)

                    if (obstacleCount >= 3) {
                        generateSecondObstacle();
                        console.log("Lever up")
                    } else {
                        setTimeout(generateObstacles, randomTime)
                    }
                }
            }, 20)
        }
    }

    function generateSecondObstacle() {
        if (!isGameOver) {
            let randomTime = Math.random() * (2000 - 500) + 500;
            console.log(randomTime, 'second level timer')
            console.log('Level 2');
            const obstacle2 = document.createElement('div')
            let obstacle2Position = 1000;
            obstacle2.classList.add('obstacle2')
            grid.appendChild(obstacle2)

            let secondTimerId = setInterval(() => {
                if (obstacle2Position > 0 && obstacle2Position < 60 && position < 60) {
                    clearInterval(secondTimerId)
                    isGameOver = true
                    alert.style.visibility = 'visible'

                    while (grid.firstChild) {
                        grid.removeChild(grid.lastChild)
                    }
                }

                obstacle2Position -= 10;
                obstacle2.style.left = obstacle2Position + 'px'

            }, 20)
            setTimeout(generateSecondObstacle, randomTime)
        }
    }
        generateObstacles();
})
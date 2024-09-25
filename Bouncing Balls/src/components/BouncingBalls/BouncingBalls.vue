<template>
    <canvas ref="canvas"></canvas>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
    setup() {
        const canvas = ref(null);
        let ctx = null;

        const circle = {
            x: 0,
            y: 0,
            radius: 200,
        };

        const NO_OF_BALLS = 5;
        const GRAVITY = 0.35;
        const SPEED_GAIN_FACTOR = 1000;
        const DIAMETER_INCREASE_FACTOR = 1.04;
        const MAX_SPEED = 10;
        const COLORS = ['#f44336', '#e81e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#9e9e9e', '#607d8b'];

        let balls = [];
        let continueAnimation = true;
        let collisionCounter = 0;

        class Ball {
            constructor(x, y, color) {
                this.x = x;
                this.y = y;
                this.radius = 10;
                this.vx = (Math.random() - 0.5) * 4;
                this.vy = 0;
                this.color = color === 'random' ? `hsl(${Math.random() * 360}, 100%, 50%)` : color;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.closePath();
            }

            update(balls) {
                this.vy += GRAVITY;
                this.vx = Math.max(Math.min(this.vx, MAX_SPEED), -MAX_SPEED);
                this.vy = Math.max(Math.min(this.vy, MAX_SPEED), -MAX_SPEED);

                this.x += this.vx;
                this.y += this.vy;

                const distFromCenter = Math.sqrt((this.x - circle.x) ** 2 + (this.y - circle.y) ** 2);

                if (distFromCenter + this.radius >= circle.radius) {
                    collisionCounter++;
                    const angle = Math.atan2(this.y - circle.y, this.x - circle.x);

                    this.vx = -Math.cos(angle) * Math.abs(this.vx) * SPEED_GAIN_FACTOR;
                    this.vy = -Math.sin(angle) * Math.abs(this.vy) * SPEED_GAIN_FACTOR;

                    this.vx = Math.max(Math.min(this.vx, MAX_SPEED), -MAX_SPEED);
                    this.vy = Math.max(Math.min(this.vy, MAX_SPEED), -MAX_SPEED);

                    const overlap = (distFromCenter + this.radius) - circle.radius;
                    this.x -= Math.cos(angle) * overlap;
                    this.y -= Math.sin(angle) * overlap;
                }

                for (let i = 0; i < balls.length; i++) {
                    if (balls[i] !== this) {
                        const dx = balls[i].x - this.x;
                        const dy = balls[i].y - this.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        if (distance < this.radius + balls[i].radius) {
                            const angle = Math.atan2(dy, dx);
                            const v1 = Math.sqrt(this.vx ** 2 + this.vy ** 2);
                            const v2 = Math.sqrt(balls[i].vx ** 2 + balls[i].vy ** 2);

                            this.vx = -Math.cos(angle) * v2;
                            this.vy = -Math.sin(angle) * v2;
                            balls[i].vx = Math.cos(angle) * v1;
                            balls[i].vy = Math.sin(angle) * v1;

                            const overlap = this.radius + balls[i].radius - distance;
                            const adjustmentFactor = overlap / 2;
                            this.x -= Math.cos(angle) * adjustmentFactor;
                            this.y -= Math.sin(angle) * adjustmentFactor;
                            balls[i].x += Math.cos(angle) * adjustmentFactor;
                            balls[i].y += Math.sin(angle) * adjustmentFactor;

                            const futureRadiusThis = this.radius * DIAMETER_INCREASE_FACTOR;
                            const futureRadiusOther = balls[i].radius * DIAMETER_INCREASE_FACTOR;

                            const futureDistFromCenterThis = Math.sqrt((this.x - circle.x) ** 2 + (this.y - circle.y) ** 2) + futureRadiusThis;
                            const futureDistFromCenterOther = Math.sqrt((balls[i].x - circle.x) ** 2 + (balls[i].y - circle.y) ** 2) + futureRadiusOther;

                            if (futureDistFromCenterThis < circle.radius) {
                                this.radius *= DIAMETER_INCREASE_FACTOR;
                                collisionCounter = 0;
                            }

                            if (futureDistFromCenterOther < circle.radius) {
                                balls[i].radius *= DIAMETER_INCREASE_FACTOR;
                                collisionCounter = 0;
                            }
                        }
                    }
                }

                if (collisionCounter > 200) {
                    continueAnimation = false;
                }

                this.draw();
            }
        }

        const getUniqueColors = () => {
            const shuffledColors = COLORS.sort(() => 0.5 - Math.random());
            return shuffledColors.slice(0, NO_OF_BALLS);
        };

        const drawCircle = () => {
            ctx.beginPath();
            ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#fef9f3';
            ctx.fill();
            ctx.strokeStyle = '#fef9f3';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.closePath();
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
            ctx.fillStyle = '#111';
            ctx.fillRect(0, 0, canvas.value.width, canvas.value.height);

            drawCircle();
            balls.forEach(ball => ball.update(balls));

            if (continueAnimation) {
                requestAnimationFrame(animate);
            }
        };

        onMounted(() => {
            ctx = canvas.value.getContext('2d');
            canvas.value.width = 400;
            canvas.value.height = 400;

            circle.x = canvas.value.width / 2;
            circle.y = canvas.value.height / 2;

            const BALL_COLOURS = getUniqueColors();
            for (let i = 0; i < NO_OF_BALLS; i++) {
                const angle = Math.random() * Math.PI;
                const r = Math.random() * (circle.radius - 10);
                const x = circle.x + r * Math.cos(angle);
                const y = circle.y + r * Math.sin(angle);
                const color = BALL_COLOURS[i % BALL_COLOURS.length];
                balls.push(new Ball(x, y, color));
            }

            animate();
        });

        return {
            canvas
        };
    }
};
</script>

<style scoped>
canvas {
    display: block;
    margin: 0 auto;
    background-color: #111;
}
</style>
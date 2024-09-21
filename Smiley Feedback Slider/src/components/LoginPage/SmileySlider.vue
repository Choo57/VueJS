<template>
    <div id="app">
        <div style="margin-bottom: 20px; font-size: 1.4rem; min-height: 30px">
            Rate the service you received
        </div>
        <div class="face" :style="faceStyle">
            <div class="eyes">
                <div class="eye left" :style="eyeLeftStyle"></div>
                <div class="eye right" :style="eyeRightStyle"></div>
            </div>
            <div class="mouth" :style="mouthStyle"></div>
        </div>
        <div class="slider-container">
            <input type="range" step="0.01" min="0" max="10" v-model="sliderValue" class="slider" />
            <div style="text-align:center; margin-top:10px">{{ sliderPercentage }}%</div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
    setup() {
        const midpoint = 5;
        const sliderValue = ref(midpoint);

        const sliderPercentage = computed(() =>
            Math.round((sliderValue.value / 10) * 100)
        );

        const faceStyle = computed(() => {
            let r, g, b;
            const value = sliderValue.value;
            if (value < midpoint) {
                // Transition from blue to yellow
                const percentage = value / midpoint;
                r = Math.round(0 + percentage * 255);
                g = Math.round(0 + percentage * 255);
                b = Math.round(255 + percentage * -255);
            } else {
                // Transition from yellow to green
                const percentage = (value - midpoint) / midpoint;
                r = Math.round(255 + percentage * -255);
                g = 255;
                b = 0;
            }
            return {
                backgroundColor: `rgb(${r}, ${g}, ${b})`,
            };
        });

        const mouthStyle = computed(() => {
            const value = sliderValue.value;
            if (value >= midpoint) {
                return {
                    backgroundColor: "black",
                    borderRadius: `0 0 ${(value - midpoint) * 10}px ${(value - midpoint) * 10}px`,
                    transform: `translate(0, ${value - midpoint + 10}px)`,
                    height: `${(value - midpoint) * 10 + midpoint}px`,
                    width: "80px",
                    position: "relative",
                    border: "none",
                };
            } else {
                return {
                    width: `${(midpoint - value) * 4 + 80}px`,
                    height: `${(midpoint - value) * 18 + 10}px`,
                    backgroundColor: "transparent",
                    border: "6px solid transparent",
                    borderRadius: "100%",
                    borderTopColor: "black",
                    position: "absolute",
                    top: `${(midpoint - value) * 1.9 + 84}px`,
                };
            }
        });

        const eyeLeftStyle = computed(() => {
            const value = sliderValue.value;
            if (value >= midpoint) {
                return {
                    transform: `translate(-10px, 0)`,
                    height: `${midpoint * 4 + (value - midpoint) * 2.5}px`,
                };
            } else {
                return {
                    transform: `translate(-10px, ${(midpoint - value) * 3}px)`,
                    height: "20px",
                };
            }
        });

        const eyeRightStyle = computed(() => {
            const value = sliderValue.value;
            if (value >= midpoint) {
                return {
                    transform: `translate(10px, 0)`,
                    height: `${midpoint * 4 + (value - midpoint) * 2.5}px`,
                };
            } else {
                return {
                    transform: `translate(10px, ${(midpoint - value) * 3}px)`,
                    height: "20px",
                };
            }
        });

        return { sliderValue, sliderPercentage, faceStyle, mouthStyle, eyeLeftStyle, eyeRightStyle };
    }
};
</script>

<style scoped>
#app {
    font-family: Arial, sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: white;
}

.face {
    width: 150px;
    height: 150px;
    min-height: 150px;
    border-radius: 50%;
    background-color: yellow;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
}

.eyes {
    display: flex;
    justify-content: space-between;
    width: 60px;
    margin-bottom: 10px;
}

.eye {
    width: 20px;
    height: 20px;
    background-color: black;
    border-radius: 50%;
}

.mouth {
    width: 80px;
    height: 10px;
    background-color: black;
    border-radius: 5px;
    transform: translateY(15px);
    z-index: 1;
}

.slider-container {
    z-index: 2;
    margin-top: 20px;
}

.slider {
    width: 300px;
}
</style>
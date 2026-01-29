const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const gridSize = 30;
const tileCount = canvas.width / gridSize;

// Game State
let snake = [{x: 10, y: 10}];
let dx = 1;
let dy = 0;
let foodX = 15;
let foodY = 15;
let score = 0;
let stars = 0;
let gameLoop;
let timerInterval;
let timeElapsed = 0;
let gameSpeed = 120;
let currentStage = 1;
let questionIndex = 0;
let questionsAnswered = 0;
let gameLoopPaused = false;
let isPaused = false;
let combo = 0;
let highestCombo = 0;
let difficulty = 'medium';

// Audio
let audioContext = null;
let isMusicPlaying = false;
let currentOscillators = [];

// Unit 2: Living Things and Non-Living Things (Malaysian Science Year 1)
// Based on textbook content

// Stage 1: Characteristics of Living Things
const stage1Items = [
    { 
        emoji: '🏃', 
        name: 'Moving Person',
        type: 'Living',
        fact: 'Living things can MOVE by themselves! Humans walk, run, and jump.',
        characteristic: 'Movement'
    },
    { 
        emoji: '🌱', 
        name: 'Growing Plant',
        type: 'Living',
        fact: 'Living things GROW and change over time. Plants start as seeds and grow into big trees!',
        characteristic: 'Growth'
    },
    { 
        emoji: '🐣', 
        name: 'Baby Chick',
        type: 'Living',
        fact: 'Living things can REPRODUCE! Birds lay eggs that hatch into baby chicks.',
        characteristic: 'Reproduction'
    },
    { 
        emoji: '🍎', 
        name: 'Eating Apple',
        type: 'Living',
        fact: 'Living things need to EAT food for energy. Humans eat fruits, vegetables, and other foods.',
        characteristic: 'Eating'
    },
    { 
        emoji: '💨', 
        name: 'Breathing',
        type: 'Living',
        fact: 'Living things BREATHE air to stay alive. We breathe oxygen from the air around us!',
        characteristic: 'Breathing'
    },
    { 
        emoji: '🐕', 
        name: 'Dog',
        type: 'Living',
        fact: 'Dogs are living things - they move, grow, eat, breathe, and have puppies!',
        characteristic: 'All 5 Characteristics'
    },
    { 
        emoji: '🌳', 
        name: 'Tree',
        type: 'Living',
        fact: 'Trees are living things! They grow from seeds, breathe through leaves, and make new trees.',
        characteristic: 'All 5 Characteristics'
    },
    { 
        emoji: '🦋', 
        name: 'Butterfly',
        type: 'Living',
        fact: 'Butterflies are living things that move (fly), eat nectar, and lay eggs!',
        characteristic: 'All 5 Characteristics'
    }
];

// Stage 2: Living vs Non-Living
const stage2Items = [
    { 
        emoji: '🐱', 
        name: 'Cat',
        type: 'Living',
        fact: 'Cats are LIVING - they move, grow, eat, breathe, and have kittens!',
        isLiving: true
    },
    { 
        emoji: '🪨', 
        name: 'Rock',
        type: 'Non-Living',
        fact: 'Rocks are NON-LIVING - they cannot move by themselves, grow, eat, breathe, or reproduce.',
        isLiving: false
    },
    { 
        emoji: '🐦', 
        name: 'Bird',
        type: 'Living',
        fact: 'Birds are LIVING things - they fly, grow, lay eggs, eat seeds, and breathe air!',
        isLiving: true
    },
    { 
        emoji: '🪑', 
        name: 'Chair',
        type: 'Non-Living',
        fact: 'Chairs are NON-LIVING - they are made by humans and cannot grow or reproduce.',
        isLiving: false
    },
    { 
        emoji: '🌺', 
        name: 'Flower',
        type: 'Living',
        fact: 'Flowers are LIVING plants - they grow, reproduce with seeds, and need water!',
        isLiving: true
    },
    { 
        emoji: '📚', 
        name: 'Book',
        type: 'Non-Living',
        fact: 'Books are NON-LIVING - they are made from paper and cannot move, eat, or grow.',
        isLiving: false
    },
    { 
        emoji: '🐠', 
        name: 'Fish',
        type: 'Living',
        fact: 'Fish are LIVING things - they swim, grow bigger, lay eggs, eat, and breathe underwater!',
        isLiving: true
    },
    { 
        emoji: '⚽', 
        name: 'Ball',
        type: 'Non-Living',
        fact: 'Balls are NON-LIVING - they only move when someone kicks them, they cannot grow or eat.',
        isLiving: false
    }
];

// Stage 3: Basic Needs of Living Things
const stage3Items = [
    { 
        emoji: '💧', 
        name: 'Water',
        type: 'Basic Need',
        fact: 'All living things need WATER to survive! We drink it, plants absorb it through roots.',
        need: 'Water'
    },
    { 
        emoji: '🌬️', 
        name: 'Air',
        type: 'Basic Need',
        fact: 'Living things need AIR to breathe! Air contains oxygen that keeps us alive.',
        need: 'Air'
    },
    { 
        emoji: '🥗', 
        name: 'Food',
        type: 'Basic Need',
        fact: 'Living things need FOOD for energy to move, grow, and stay healthy!',
        need: 'Food'
    },
    { 
        emoji: '🏠', 
        name: 'Shelter',
        type: 'Basic Need',
        fact: 'Living things need SHELTER for protection! Humans live in houses, birds in nests.',
        need: 'Shelter'
    },
    { 
        emoji: '🥤', 
        name: 'Drinking Water',
        type: 'Basic Need',
        fact: 'Without water, living things cannot survive. We need to drink water every day!',
        need: 'Water'
    },
    { 
        emoji: '☀️', 
        name: 'Sunlight',
        type: 'Basic Need',
        fact: 'Plants need SUNLIGHT to make food! The sun helps plants grow strong and green.',
        need: 'Light for Plants'
    },
    { 
        emoji: '🍱', 
        name: 'Healthy Food',
        type: 'Basic Need',
        fact: 'Eating healthy food gives our bodies energy and helps us grow properly!',
        need: 'Food'
    },
    { 
        emoji: '🌳', 
        name: 'Tree Shelter',
        type: 'Basic Need',
        fact: 'Trees provide shelter for many animals! Birds nest in branches, squirrels live in holes.',
        need: 'Shelter'
    }
];

// Questions for Stage 1: Characteristics
const stage1Questions = [
    {
        question: 'What are the 5 main characteristics of living things?',
        answer: '1. MOVE - Living things can move by themselves\n2. GROW - Living things grow and change\n3. REPRODUCE - Living things make new living things\n4. EAT - Living things need food for energy\n5. BREATHE - Living things need air to survive'
    },
    {
        question: 'How do we know a plant is a living thing?',
        answer: 'Plants are living things because they:\n• Grow from seeds into bigger plants\n• Reproduce by making seeds or new plants\n• Need food (they make it from sunlight)\n• Breathe through their leaves\n• Move slowly towards sunlight'
    },
    {
        question: 'Can living things move? Give 3 examples.',
        answer: 'Yes! Living things can move:\n1. Humans walk and run\n2. Birds fly in the sky\n3. Fish swim in water\n4. Snakes slither on ground\n5. Plants grow towards sunlight'
    },
    {
        question: 'Why do living things need to eat?',
        answer: 'Living things need to eat because:\n• Food gives them ENERGY to move and play\n• Food helps them GROW bigger and stronger\n• Food keeps their bodies HEALTHY\n• Without food, living things cannot survive'
    }
];

// Questions for Stage 2: Living vs Non-Living
const stage2Questions = [
    {
        question: 'What is the difference between living and non-living things?',
        answer: 'LIVING things: Move, grow, reproduce, eat, breathe (like cats, trees, fish)\n\nNON-LIVING things: Cannot move by themselves, do not grow, do not eat or breathe (like rocks, chairs, books)'
    },
    {
        question: 'Is a car a living thing? Why or why not?',
        answer: 'NO, a car is NOT a living thing because:\n• It cannot move by itself (needs fuel and driver)\n• It does not grow bigger\n• It cannot make baby cars\n• It does not eat food\n• It does not breathe air\nCars are non-living things made by humans!'
    },
    {
        question: 'Name 3 living things and 3 non-living things you see every day.',
        answer: 'LIVING THINGS:\n1. Dogs or cats (pets)\n2. Trees or flowers (plants)\n3. People (your family and friends)\n\nNON-LIVING THINGS:\n1. Tables and chairs (furniture)\n2. Books and pencils (school items)\n3. Rocks and water (natural non-living)'
    },
    {
        question: 'Can non-living things move? Explain your answer.',
        answer: 'Non-living things CAN move, but NOT by themselves:\n• A ball moves only when kicked\n• A car moves only with fuel and a driver\n• Water flows when wind blows it\n• Rocks roll down hills due to gravity\n\nThey CANNOT move on their own like living things!'
    }
];

// Questions for Stage 3: Basic Needs
const stage3Questions = [
    {
        question: 'What are the 4 basic needs of all living things?',
        answer: '1. AIR - To breathe and stay alive\n2. WATER - To drink and stay hydrated\n3. FOOD - For energy and growth\n4. SHELTER - For protection and safety\n\nWithout these, living things cannot survive!'
    },
    {
        question: 'Why do living things need water?',
        answer: 'Living things need water because:\n• Our bodies are made mostly of water\n• Water helps us digest food\n• Water keeps us cool\n• Plants need water to grow\n• Without water, living things will die in a few days!'
    },
    {
        question: 'What happens if a plant does not get sunlight?',
        answer: 'If a plant does not get sunlight:\n• It cannot make food (plants use sunlight to make food)\n• Leaves turn yellow and weak\n• The plant stops growing\n• Eventually, the plant will die\n\nPlants need sunlight to stay alive and healthy!'
    },
    {
        question: 'Why do animals need shelter?',
        answer: 'Animals need shelter to:\n• Protect themselves from rain, sun, and cold weather\n• Keep safe from predators (other animals that might harm them)\n• Have a place to rest and sleep\n• Raise their babies safely\n\nExamples: Birds build nests, bears live in caves, humans live in houses!'
    },
    {
        question: 'How do humans get the food they need?',
        answer: 'Humans get food by:\n• Growing vegetables and fruits in farms and gardens\n• Raising animals like chickens, cows, and fish\n• Buying food from markets and shops\n• Cooking and preparing meals\n\nWe need a balanced diet with fruits, vegetables, rice, meat, and water!'
    }
];

let currentItems = stage1Items;
let currentQuestions = stage1Questions;
let currentItem = currentItems[0];

// Initialize game
function setDifficulty(level) {
    difficulty = level;
    document.querySelectorAll('.diff-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    switch(level) {
        case 'easy': gameSpeed = 150; break;
        case 'medium': gameSpeed = 120; break;
        case 'hard': gameSpeed = 90; break;
    }
}

function startGame() {
    // Reset game state
    snake = [{x: 10, y: 10}];
    dx = 1;
    dy = 0;
    score = 0;
    stars = 0;
    timeElapsed = 0;
    currentStage = 1;
    questionIndex = 0;
    questionsAnswered = 0;
    combo = 0;
    highestCombo = 0;
    gameLoopPaused = false;
    isPaused = false;
    
    currentItems = stage1Items;
    currentQuestions = stage1Questions;
    
    // UI Updates
    document.getElementById('startScreen').classList.remove('active');
    document.getElementById('gameScreen').classList.add('active');
    updateScore();
    updateStars();
    updateStageInfo();
    generateFood();
    
    // Start game loops
    gameLoop = setInterval(update, gameSpeed);
    timerInterval = setInterval(updateTimer, 1000);
}

function update() {
    if (gameLoopPaused || isPaused) return;
    
    moveSnake();
    
    if (checkCollision()) {
        endGame();
        return;
    }
    
    if (snake[0].x === foodX && snake[0].y === foodY) {
        score += 10;
        combo++;
        if (combo > highestCombo) highestCombo = combo;
        
        updateScore();
        updateStars();
        updateProgress();
        showCombo();
        
        document.getElementById('factText').textContent = currentItem.fact;
        playCollectSound();
        
        // Check for question trigger (every 80 points)
        if (score % 80 === 0 && score > 0) {
            if (questionIndex < currentQuestions.length) {
                showQuestionModal();
            }
        }
        
        generateFood();
    } else {
        snake.pop();
    }
    
    draw();
}

function moveSnake() {
    let newX = snake[0].x + dx;
    let newY = snake[0].y + dy;
    
    // Wrap around borders
    if (newX < 0) newX = tileCount - 1;
    if (newX >= tileCount) newX = 0;
    if (newY < 0) newY = tileCount - 1;
    if (newY >= tileCount) newY = 0;
    
    snake.unshift({x: newX, y: newY});
}

function checkCollision() {
    const head = snake[0];
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function generateFood() {
    foodX = Math.floor(Math.random() * tileCount);
    foodY = Math.floor(Math.random() * tileCount);
    currentItem = currentItems[Math.floor(Math.random() * currentItems.length)];
    
    // Update target display
    document.getElementById('targetEmoji').textContent = currentItem.emoji;
    document.getElementById('targetName').textContent = currentItem.name;
    document.getElementById('itemType').textContent = currentItem.type;
    
    // Check if food spawns on snake
    for (let segment of snake) {
        if (segment.x === foodX && segment.y === foodY) {
            generateFood();
            return;
        }
    }
}

function draw() {
    // Background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    if (currentStage === 1) {
        gradient.addColorStop(0, '#e8f5e9');
        gradient.addColorStop(1, '#c8e6c9');
    } else if (currentStage === 2) {
        gradient.addColorStop(0, '#fff3e0');
        gradient.addColorStop(1, '#ffe0b2');
    } else {
        gradient.addColorStop(0, '#e3f2fd');
        gradient.addColorStop(1, '#bbdefb');
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Grid
    ctx.strokeStyle = 'rgba(0,0,0,0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i < tileCount; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(canvas.width, i * gridSize);
        ctx.stroke();
    }
    
    // Snake
    for (let i = 0; i < snake.length; i++) {
        const segment = snake[i];
        const x = segment.x * gridSize;
        const y = segment.y * gridSize;
        
        if (i === 0) {
            // Head
            const headGradient = ctx.createRadialGradient(x + gridSize/2, y + gridSize/2, 0, x + gridSize/2, y + gridSize/2, gridSize/2);
            headGradient.addColorStop(0, '#4caf50');
            headGradient.addColorStop(1, '#2e7d32');
            ctx.fillStyle = headGradient;
            ctx.fillRect(x + 3, y + 3, gridSize - 6, gridSize - 6);
            
            // Eyes
            ctx.fillStyle = 'white';
            ctx.fillRect(x + 8, y + 8, 6, 6);
            ctx.fillRect(x + gridSize - 14, y + 8, 6, 6);
            ctx.fillStyle = 'black';
            ctx.fillRect(x + 10, y + 10, 3, 3);
            ctx.fillRect(x + gridSize - 12, y + 10, 3, 3);
        } else {
            // Body
            ctx.fillStyle = `rgba(76, 175, 80, ${1 - (i / snake.length) * 0.5})`;
            ctx.fillRect(x + 4, y + 4, gridSize - 8, gridSize - 8);
        }
    }
    
    // Food
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(currentItem.emoji, foodX * gridSize + gridSize/2, foodY * gridSize + gridSize/2);
}

function updateScore() {
    document.getElementById('score').textContent = score;
}

function updateStars() {
    if (score < 80) stars = 0;
    else if (score < 160) stars = 1;
    else if (score < 240) stars = 2;
    else if (score < 320) stars = 3;
    else if (score < 400) stars = 4;
    else stars = 5;
    
    document.getElementById('stars').textContent = '⭐'.repeat(stars) || '0';
}

function updateProgress() {
    const maxScore = 480; // 6 questions * 80 points
    const progress = Math.min((score / maxScore) * 100, 100);
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('progressText').textContent = Math.floor(progress) + '%';
    
    const nextMilestone = Math.ceil(score / 80) * 80;
    if (nextMilestone <= maxScore) {
        document.getElementById('nextMilestone').textContent = `Next question at ${nextMilestone} points!`;
    } else {
        document.getElementById('nextMilestone').textContent = 'All questions unlocked!';
    }
}

function updateTimer() {
    timeElapsed++;
    document.getElementById('timer').textContent = timeElapsed + 's';
}

function updateStageInfo() {
    const stageData = [
        { icon: '🌱', text: 'Stage 1: Characteristics of Living Things' },
        { icon: '🔍', text: 'Stage 2: Living vs Non-Living' },
        { icon: '💧', text: 'Stage 3: Basic Needs of Living Things' }
    ];
    
    const stage = stageData[currentStage - 1];
    document.querySelector('.stage-icon').textContent = stage.icon;
    document.querySelector('.stage-text').textContent = stage.text;
}

function showCombo() {
    if (combo > 1) {
        const comboDisplay = document.getElementById('comboDisplay');
        comboDisplay.textContent = `${combo}x COMBO! 🔥`;
        comboDisplay.style.display = 'block';
        setTimeout(() => {
            comboDisplay.style.display = 'none';
        }, 1000);
    }
}

function showQuestionModal() {
    if (questionIndex >= currentQuestions.length) return;
    
    gameLoopPaused = true;
    const q = currentQuestions[questionIndex];
    
    document.getElementById('modalQuestion').textContent = q.question;
    document.getElementById('modalAnswer').textContent = q.answer;
    document.getElementById('questionNumber').textContent = questionIndex + 1;
    document.getElementById('totalQuestions').textContent = currentQuestions.length;
    document.getElementById('questionModal').classList.add('active');
    
    let timeLeft = 15;
    document.getElementById('modalTimer').textContent = timeLeft;
    
    const modalTimer = setInterval(() => {
        timeLeft--;
        document.getElementById('modalTimer').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(modalTimer);
        }
    }, 1000);
}

function nextQuestion() {
    document.getElementById('questionModal').classList.remove('active');
    questionIndex++;
    questionsAnswered++;
    
    // Check stage transition
    if (currentStage === 1 && questionsAnswered >= stage1Questions.length) {
        transitionToStage2();
    } else if (currentStage === 2 && questionsAnswered >= stage2Questions.length) {
        transitionToStage3();
    } else if (currentStage === 3 && questionsAnswered >= stage3Questions.length) {
        endGame();
        return;
    }
    
    gameLoopPaused = false;
}

function transitionToStage2() {
    currentStage = 2;
    currentItems = stage2Items;
    currentQuestions = stage2Questions;
    questionIndex = 0;
    updateStageInfo();
    generateFood();
}

function transitionToStage3() {
    currentStage = 3;
    currentItems = stage3Items;
    currentQuestions = stage3Questions;
    questionIndex = 0;
    updateStageInfo();
    generateFood();
}

function endGame() {
    clearInterval(gameLoop);
    clearInterval(timerInterval);
    stopMusic();
    
    document.getElementById('gameScreen').classList.remove('active');
    document.getElementById('endScreen').classList.add('active');
    
    document.getElementById('finalScore').textContent = score;
    document.getElementById('finalTime').textContent = timeElapsed + 's';
    document.getElementById('starDisplay').textContent = '⭐'.repeat(stars) || 'No stars yet';
    
    // Performance evaluation
    let badgeIcon, title, message;
    if (score >= 400) {
        badgeIcon = '🏆';
        title = 'Living World Master!';
        message = 'Perfect! You understand living things excellently!';
    } else if (score >= 300) {
        badgeIcon = '🥇';
        title = 'Science Expert!';
        message = 'Great job! You know living things very well!';
    } else if (score >= 200) {
        badgeIcon = '🥈';
        title = 'Science Learner!';
        message = 'Good work! Keep practicing about living things!';
    } else {
        badgeIcon = '🥉';
        title = 'Science Explorer!';
        message = 'Nice try! Play again to learn more!';
    }
    
    document.querySelector('.badge-icon').textContent = badgeIcon;
    document.getElementById('performanceTitle').textContent = title;
    document.getElementById('performanceMessage').textContent = message;
}

function restartGame() {
    document.getElementById('endScreen').classList.remove('active');
    document.getElementById('startScreen').classList.add('active');
}

function togglePause() {
    isPaused = !isPaused;
    document.getElementById('pauseOverlay').classList.toggle('active', isPaused);
}

function shareScore() {
    const text = `I scored ${score} points learning about Living Things in Science Year 1! Can you beat my score? 🌱🎮`;
    if (navigator.share) {
        navigator.share({ text });
    } else {
        alert(text);
    }
}

// Audio functions
function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function toggleMusic() {
    initAudioContext();
    if (isMusicPlaying) {
        stopMusic();
        document.getElementById('musicIcon').textContent = '🔇';
    } else {
        playBackgroundMusic();
        document.getElementById('musicIcon').textContent = '🔊';
    }
}

function playBackgroundMusic() {
    if (!audioContext || isMusicPlaying) return;
    isMusicPlaying = true;
    
    const notes = [262, 294, 330, 349, 392, 440, 494, 523];
    let noteIndex = 0;
    
    function playNote() {
        if (!isMusicPlaying) return;
        
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(audioContext.destination);
        
        osc.frequency.value = notes[noteIndex];
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.1, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        osc.start();
        osc.stop(audioContext.currentTime + 0.5);
        
        currentOscillators.push(osc);
        noteIndex = (noteIndex + 1) % notes.length;
        
        setTimeout(playNote, 500);
    }
    
    playNote();
}

function stopMusic() {
    isMusicPlaying = false;
    currentOscillators.forEach(osc => {
        try { osc.stop(); } catch (e) {}
    });
    currentOscillators = [];
}

function playCollectSound() {
    if (!audioContext) return;
    
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    osc.connect(gain);
    gain.connect(audioContext.destination);
    
    osc.frequency.value = 800;
    osc.type = 'square';
    gain.gain.setValueAtTime(0.2, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    osc.start();
    osc.stop(audioContext.currentTime + 0.1);
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (e.key === 'p' || e.key === 'P') {
        togglePause();
        e.preventDefault();
        return;
    }
    
    if (gameLoopPaused || isPaused) return;
    
    if (e.key === 'ArrowUp' && dy === 0) {
        dx = 0; dy = -1;
    } else if (e.key === 'ArrowDown' && dy === 0) {
        dx = 0; dy = 1;
    } else if (e.key === 'ArrowLeft' && dx === 0) {
        dx = -1; dy = 0;
    } else if (e.key === 'ArrowRight' && dx === 0) {
        dx = 1; dy = 0;
    }
    e.preventDefault();
});

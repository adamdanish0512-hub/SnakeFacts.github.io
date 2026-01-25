const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const gridSize = 25;
const tileCount = canvas.width / gridSize;

// Audio Context for background music
let audioContext = null;
let isMusicPlaying = false;
let musicOscillators = [];
let musicGains = [];

function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function stopMusic() {
    musicOscillators.forEach(osc => {
        try {
            osc.stop();
        } catch (e) {}
    });
    musicGains.forEach(gain => {
        try {
            gain.disconnect();
        } catch (e) {}
    });
    musicOscillators = [];
    musicGains = [];
    isMusicPlaying = false;
}

function playPokemonTheme() {
    if (!audioContext) return;
    if (isMusicPlaying) return;
    
    isMusicPlaying = true;
    
    // Pokemon theme notes (simplified version)
    const notes = [
        { freq: 330, duration: 0.3 },  // E
        { freq: 330, duration: 0.3 },  // E
        { freq: 330, duration: 0.3 },  // E
        { freq: 262, duration: 0.2 },  // C
        { freq: 330, duration: 0.1 },  // E
        { freq: 392, duration: 0.4 },  // G
        { freq: 196, duration: 0.4 },  // G
        { freq: 262, duration: 0.3 },  // C
        { freq: 196, duration: 0.2 },  // G
        { freq: 165, duration: 0.2 },  // E
        { freq: 220, duration: 0.2 },  // A
        { freq: 246, duration: 0.3 },  // B
        { freq: 247, duration: 0.2 },  // B
        { freq: 262, duration: 0.2 },  // C
        { freq: 196, duration: 0.3 },  // G
    ];
    
    function playSequence(startTime = audioContext.currentTime) {
        let currentTime = startTime;
        
        notes.forEach(note => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            
            osc.connect(gain);
            gain.connect(audioContext.destination);
            
            osc.frequency.value = note.freq;
            osc.type = 'square';
            
            gain.gain.setValueAtTime(0.1, currentTime);
            gain.gain.setValueAtTime(0.1, currentTime + note.duration - 0.05);
            gain.gain.setValueAtTime(0, currentTime + note.duration);
            
            osc.start(currentTime);
            osc.stop(currentTime + note.duration);
            
            musicOscillators.push(osc);
            musicGains.push(gain);
            
            currentTime += note.duration + 0.05;
        });
        
        // Loop the theme
        setTimeout(() => {
            if (isMusicPlaying) {
                musicOscillators = [];
                musicGains = [];
                playSequence();
            }
        }, (currentTime - startTime) * 1000);
    }
    
    playSequence();
}

function toggleMusic() {
    initAudioContext();
    const musicBtn = document.querySelector('[onclick="toggleMusic()"]');
    
    if (isMusicPlaying) {
        stopMusic();
        musicBtn.textContent = '🔇';
    } else {
        playPokemonTheme();
        musicBtn.textContent = '🔊';
    }
}

// Stage 1: Scientific Skills - Science Process Skills (Observing & Communicating)
const stage1Items = [
    { 
        emoji: '👀', 
        topic: 'Observing', 
        fact: 'We observe with our senses!',
        question: 'What are the 6 senses we use for observation?',
        answer: '1. Touch\n2. Sight\n3. Smell\n4. Hearing\n5. Taste\n6. Balance' 
    },
    { 
        emoji: '👂', 
        topic: 'Observing - Hearing', 
        fact: 'Hearing helps us observe sounds!',
        question: 'Name 6 senses used for observation',
        answer: '1. Touch\n2. Sight\n3. Smell\n4. Hearing\n5. Taste\n6. Balance' 
    },
    { 
        emoji: '👃', 
        topic: 'Observing - Smell', 
        fact: 'Smell helps us observe odors!',
        question: 'What are the 6 senses for observation?',
        answer: '1. Touch\n2. Sight\n3. Smell\n4. Hearing\n5. Taste\n6. Balance' 
    },
    { 
        emoji: '🤚', 
        topic: 'Observing - Touch', 
        fact: 'Touch helps us feel textures!',
        question: 'Name the 6 senses used for observation',
        answer: '1. Touch\n2. Sight\n3. Smell\n4. Hearing\n5. Taste\n6. Balance' 
    },
    { 
        emoji: '💬', 
        topic: 'Communicating', 
        fact: 'Communicating helps us share what we learned!',
        question: 'What are the 3 ways to communicate in science?',
        answer: '1. Oral - Speaking and discussing\n2. Sketch - Drawing pictures and diagrams\n3. Writing - Writing reports and notes' 
    },
    { 
        emoji: '🗣️', 
        topic: 'Communicating - Oral', 
        fact: 'Speaking about findings helps others learn!',
        question: 'Name 3 ways to communicate scientific findings',
        answer: '1. Oral - Speaking and discussing\n2. Sketch - Drawing pictures and diagrams\n3. Writing - Writing reports and notes' 
    },
    { 
        emoji: '✏️', 
        topic: 'Communicating - Sketch', 
        fact: 'Drawing diagrams helps show what we observe!',
        question: 'List 3 ways to communicate in science',
        answer: '1. Oral - Speaking and discussing\n2. Sketch - Drawing pictures and diagrams\n3. Writing - Writing reports and notes' 
    },
    { 
        emoji: '📝', 
        topic: 'Communicating - Writing', 
        fact: 'Writing reports records our discoveries!',
        question: 'What are the 3 methods of scientific communication?',
        answer: '1. Oral - Speaking and discussing\n2. Sketch - Drawing pictures and diagrams\n3. Writing - Writing reports and notes' 
    }
];

// Stage 2: Science Room Rules
const stage2Items = [
    { emoji: '👓', topic: 'Science Room Rules', fact: 'Wearing safety goggles protects your eyes!' },
    { emoji: '🧤', topic: 'Science Room Rules', fact: 'Wearing gloves keeps your hands clean and safe!' },
    { emoji: '🚫', topic: 'Science Room Rules', fact: 'Never run in the science room!' },
    { emoji: '⚠️', topic: 'Science Room Rules', fact: 'Always ask the teacher for help!' },
    { emoji: '📋', topic: 'Science Room Rules', fact: 'Follow instructions carefully and completely!' },
    { emoji: '🧹', topic: 'Science Room Rules', fact: 'Keep the science room clean and tidy!' },
    { emoji: '🤝', topic: 'Science Room Rules', fact: 'Work together and help your friends!' },
    { emoji: '⏱️', topic: 'Science Room Rules', fact: 'Listen to all instructions and ask questions!' }
];

// Stage 3: Living things and Non-Living Things
const stage3Items = [
    { emoji: '🐶', topic: 'Living Things', fact: 'Dogs are living things that can move and grow!' },
    { emoji: '🌳', topic: 'Living Things', fact: 'Trees are living things that need water and sunlight!' },
    { emoji: '🐝', topic: 'Living Things', fact: 'Insects are living things with special adaptations!' },
    { emoji: '👨', topic: 'Living Things', fact: 'Humans are living things that need food and water!' },
    { emoji: '🪨', topic: 'Non-Living Things', fact: 'Rocks are non-living things that do not grow!' },
    { emoji: '💧', topic: 'Non-Living Things', fact: 'Water is non-living but helps living things survive!' },
    { emoji: '🪑', topic: 'Non-Living Things', fact: 'Furniture is non-living and made by humans!' },
    { emoji: '☀️', topic: 'Living vs Non-Living', fact: 'The sun provides energy for living things!' }
];

// Questions for Topic 1: Scientific Skills
const stage1Questions = [
    {
        question: 'What are the 6 senses we use to observe objects?',
        answer: '1. Touch\n2. Sight\n3. Smell\n4. Hearing\n5. Taste\n6. Balance'
    },
    {
        question: 'What sense would you use to identify the smell of flowers?',
        answer: 'Smell (Olfaction) - Your sense of smell helps you detect odors and scents from flowers.'
    },
    {
        question: 'Why is observing important in science?',
        answer: 'Observing is important in science because it helps us gather information about the natural world using our senses and tools, which forms the basis of scientific investigation.'
    },
    {
        question: 'What should you do with science apparatus after using it?',
        answer: 'After using science apparatus, you should:\n1. Clean it properly\n2. Dry it completely\n3. Return it to its designated storage location\n4. Handle it carefully to avoid damage'
    },
    {
        question: 'Why is it important to handle specimens carefully?',
        answer: 'It is important to handle specimens carefully because:\n1. To avoid damaging them\n2. To preserve their condition for study\n3. To ensure accurate observations\n4. To show respect for living or valuable specimens'
    },
    {
        question: 'How can sketching help you in science?',
        answer: 'Sketching helps in science by:\n1. Recording observations accurately\n2. Showing details that might be missed in words\n3. Communicating findings to others\n4. Developing observation skills'
    }
];

// Questions for Topic 2: Science Room Rules
const stage2Questions = [
    {
        question: 'State two rules you must follow before entering the laboratory?',
        answer: '1. Always wear appropriate safety gear (goggles, gloves)\n2. Follow all instructions from the teacher before starting any experiment'
    },
    {
        question: 'What will happen if you throw rubbish into the sink?',
        answer: 'Throwing rubbish into the sink can:\n1. Clog the drain\n2. Contaminate water\n3. Cause environmental damage\n4. Lead to costly repairs'
    },
    {
        question: 'Why should you clean the lab before leaving?',
        answer: 'You should clean the lab before leaving because:\n1. To maintain a safe environment\n2. To prevent accidents\n3. To show respect for the space\n4. To prepare for the next class\n5. To prevent the growth of bacteria or mold'
    }
];

// Questions for Topic 3: Living things and Non-Living Things
const stage3Questions = [
    {
        question: 'Name three living things and three non-living things?',
        answer: 'Living things: Dog, Tree, Human\nNon-living things: Rock, Water, Chair'
    },
    {
        question: 'What makes something a living thing?',
        answer: 'A living thing:\n1. Can move (some on their own)\n2. Can grow and reproduce\n3. Needs food and water\n4. Can respond to their environment\n5. Can produce waste'
    },
    {
        question: 'What are the basics of living things?',
        answer: 'The basics of living things are:\n1. They are made of cells\n2. They need energy (food)\n3. They can grow\n4. They can reproduce\n5. They respond to their environment'
    },
    {
        question: 'Name two characteristics that all living things share?',
        answer: '1. All living things grow and develop\n2. All living things can reproduce and create new organisms'
    },
    {
        question: 'How are living things different from non-living things?',
        answer: 'Living things:\n1. Move on their own\n2. Eat and digest food\n3. Grow and change\n4. Reproduce\n5. Respond to environment\n\nNon-living things do not have these qualities.'
    },
    {
        question: 'What does size tell us about living things?',
        answer: 'Size tells us:\n1. The age and maturity of the organism\n2. Whether it is growing properly\n3. Its stage in life cycle\n4. How much food/water it might need\n5. What environmental conditions it needs'
    },
    {
        question: 'Why do humans need water?',
        answer: 'Humans need water because:\n1. To maintain body temperature\n2. To transport nutrients\n3. To remove waste products\n4. To aid digestion\n5. To keep organs functioning properly'
    },
    {
        question: 'How does air help living things?',
        answer: 'Air helps living things by:\n1. Providing oxygen for breathing\n2. Carrying seeds and pollen for reproduction\n3. Spreading sounds for communication\n4. Supporting water cycle\n5. Transporting weather patterns'
    }
];

let snake = [{x: 10, y: 10}];
let dx = 0;
let dy = 0;
let currentItem = stage1Items[0];
let foodX = 15;
let foodY = 15;
let score = 0;
let stars = 0;
let gameLoop;
let timerInterval;
let timeElapsed = 0;
let gameSpeed = 120;
let currentStage = 1;
let scienceItems = stage1Items;
let currentQuestion = stage1Items[0].question;
let currentAnswer = stage1Items[0].answer;
let questionIndex = 0;
let questionsShown = 0;
let nextQuestionThreshold = 50;
let modalTimer;
let gameLoopPaused = false;
let currentTopicQuestions = stage1Questions;

function startGame() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';
    
    snake = [{x: 10, y: 10}];
    dx = 1;
    dy = 0;
    score = 0;
    stars = 0;
    timeElapsed = 0;
    currentStage = 1;
    scienceItems = stage1Items;
    questionIndex = 0;
    questionsShown = 0;
    nextQuestionThreshold = 50;
    gameLoopPaused = true; // Start paused for initial question
    currentTopicQuestions = stage1Questions;
    
    // Set initial question
    const firstQuestion = stage1Questions[0];

    currentQuestion = firstQuestion.question;
    currentAnswer = firstQuestion.answer;
    
    
    updateScore();
    updateStars();
    updateStageInfo();
    updateQuestionDisplay();
    generateFood();
    
    const gameScreen = document.getElementById('gameScreen');
    gameScreen.classList.remove('stage2');
    gameScreen.classList.add('stage1');
    
    const canvas = document.getElementById('canvas');
    canvas.classList.remove('stage2');
    canvas.classList.add('stage1');
    
    draw(); // Draw initial state
    
    // Show initial question for 6 seconds
    showInitialQuestion();
    
    gameLoop = setInterval(update, gameSpeed);
    timerInterval = setInterval(updateTimer, 1000);
}

function updateQuestionDisplay() {
    document.getElementById('questionText').textContent = currentQuestion;
    
    // Calculate unlock threshold for current question
    // Question 0 unlocks at 120, Question 1 at 240, Question 2 at 360
    const unlockThreshold = (questionIndex + 1) * 120;
    
    if (score >= unlockThreshold && currentStage === 1) {
        document.getElementById('lockIcon').style.display = 'none';
        document.getElementById('answerText').classList.add('unlocked');
        document.getElementById('answerText').textContent = currentAnswer;
    } else {
        document.getElementById('lockIcon').style.display = 'block';
        document.getElementById('answerText').classList.remove('unlocked');
        document.getElementById('answerText').textContent = '';
    }
}

function updateStageInfo() {
    let stageText = '';
    if (currentStage === 1) {
        stageText = '🔬 Stage 1: Scientific Skills (6 questions)';
    } else if (currentStage === 2) {
        stageText = '📚 Stage 2: Science Room Rules (3 questions)';
    } else if (currentStage === 3) {
        stageText = '🌍 Stage 3: Living things and Non-Living Things (8 questions)';
    }
    document.getElementById('stageInfo').textContent = stageText;
}

function transitionToStage2() {
    // Update stage
    currentStage = 2;
    scienceItems = stage2Items;
    questionIndex = 0;
    questionsShown = 0;
    nextQuestionThreshold = 50;
    currentTopicQuestions = stage2Questions;
    
    // Update UI
    updateStageInfo();
    
    // Update background
    const gameScreen = document.getElementById('gameScreen');
    gameScreen.classList.remove('stage1');
    gameScreen.classList.add('stage2');
    
    const canvas = document.getElementById('canvas');
    canvas.classList.remove('stage1');
    canvas.classList.add('stage2');
    
    // Generate new food item from stage 2
    generateFood();
}

function transitionToStage3() {
    // Update stage
    currentStage = 3;
    scienceItems = stage3Items;
    questionIndex = 0;
    questionsShown = 0;
    nextQuestionThreshold = 50;
    currentTopicQuestions = stage3Questions;
    
    // Update UI
    updateStageInfo();
    
    // Update background - use stage2 colors for stage 3
    const gameScreen = document.getElementById('gameScreen');
    gameScreen.classList.remove('stage1');
    gameScreen.classList.add('stage2');
    
    const canvas = document.getElementById('canvas');
    canvas.classList.remove('stage1');
    canvas.classList.add('stage2');
    
    // Generate new food item from stage 3
    generateFood();
}

function update() {
    if (gameLoopPaused) {
        return;
    }
    
    moveSnake();
    
    if (checkCollision()) {
        endGame();
        return;
    }
    
    if (snake[0].x === foodX && snake[0].y === foodY) {
        score += 10;
        updateScore();
        updateStars();
        
        document.getElementById('factText').textContent = currentItem.fact;
        updateQuestionDisplay();
        
        // Check if score reaches the threshold to show question
        if (score === nextQuestionThreshold && currentStage === 1 && questionsShown < stage1Questions.length) {
            showQuestionModal();
            gameLoopPaused = true;
            questionsShown++;
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
    
    // Teleport to opposite side when hitting borders
    if (newX < 0) newX = tileCount - 1;
    if (newX >= tileCount) newX = 0;
    if (newY < 0) newY = tileCount - 1;
    if (newY >= tileCount) newY = 0;
    
    const head = {x: newX, y: newY};
    snake.unshift(head);
}

function checkCollision() {
    const head = snake[0];
    
    // Only check for self-collision (hitting own tail)
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
    currentItem = scienceItems[Math.floor(Math.random() * scienceItems.length)];
    
    for (let segment of snake) {
        if (segment.x === foodX && segment.y === foodY) {
            generateFood();
            return;
        }
    }
}

function draw() {
    // Draw background with stage-specific colors
    if (currentStage === 1) {
        ctx.fillStyle = '#f1f8e9';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
        ctx.fillStyle = '#fff8e1';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    // Draw grid
    for (let i = 0; i < tileCount; i++) {
        for (let j = 0; j < tileCount; j++) {
            if ((i + j) % 2 === 0) {
                if (currentStage === 1) {
                    ctx.fillStyle = '#e8f5e9';
                } else {
                    ctx.fillStyle = '#ffe0b2';
                }
                ctx.fillRect(i * gridSize, j * gridSize, gridSize, gridSize);
            }
        }
    }
    
    ctx.fillStyle = '#2a5298';
    for (let i = 0; i < snake.length; i++) {
        const segment = snake[i];
        ctx.fillRect(segment.x * gridSize + 2, segment.y * gridSize + 2, gridSize - 4, gridSize - 4);
        
        if (i === 0) {
            ctx.fillStyle = '#1e3c72';
            ctx.fillRect(segment.x * gridSize + 2, segment.y * gridSize + 2, gridSize - 4, gridSize - 4);
            
            ctx.fillStyle = 'white';
            ctx.fillRect(segment.x * gridSize + 7, segment.y * gridSize + 7, 4, 4);
            ctx.fillRect(segment.x * gridSize + 14, segment.y * gridSize + 7, 4, 4);
            
            ctx.fillStyle = '#2a5298';
        }
    }
    
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(currentItem.emoji, foodX * gridSize + gridSize/2, foodY * gridSize + gridSize/2);
}

function updateScore() {
    document.getElementById('score').textContent = score;
}

function updateStars() {
    // Calculate stars based on score ranges
    if (score < 50) {
        stars = 0;
    } else if (score < 80) {
        stars = 1;
    } else if (score < 110) {
        stars = 2;
    } else if (score < 150) {
        stars = 3;
    } else if (score < 200) {
        stars = 4;
    } else if (score >= 220) {
        stars = 5;
    }
    document.getElementById('stars').textContent = stars;
}

function updateTimer() {
    timeElapsed++;
    document.getElementById('timer').textContent = timeElapsed;
}

function endGame() {
    clearInterval(gameLoop);
    clearInterval(timerInterval);
    stopMusic();
    
    document.getElementById('gameScreen').style.display = 'none';
    document.getElementById('endScreen').style.display = 'block';
    
    document.getElementById('finalScore').textContent = score;
    document.getElementById('finalTime').textContent = timeElapsed;
    
    let starDisplay = '';
    for (let i = 0; i < stars; i++) {
        starDisplay += '<span class="star">⭐</span>';
    }
    document.getElementById('starDisplay').innerHTML = starDisplay || '<p style="color: #999;">No stars earned</p>';
    
    let performance = '';
    if (score >= 100) {
        performance = 'Excellent! You are a science champion!';
    } else if (score >= 50) {
        performance = 'Great job! Keep learning science!';
    } else {
        performance = 'Good try! Practice makes perfect!';
    }
    
    document.getElementById('finalFact').innerHTML = '<p style="color: #1e3c72; font-weight: bold;">' + performance + '</p>';
}

function restartGame() {
    document.getElementById('endScreen').style.display = 'none';
    document.getElementById('startScreen').style.display = 'block';
}

function showInitialQuestion() {
    if (currentTopicQuestions.length > 0) {
        const q = currentTopicQuestions[0];
        document.getElementById('modalQuestion').textContent = q.question;
        document.getElementById('questionModal').classList.add('active');
        document.querySelector('.answerBox').style.display = 'none'; // Hide answer
        document.querySelector('.modalButtons').style.display = 'none'; // Hide button
        document.getElementById('timerDisplay').style.display = 'none'; // Hide timer
        
        let timeLeft = 6;
        
        // Clear any existing modal timer
        if (modalTimer) {
            clearInterval(modalTimer);
        }
        
        // Start 6-second countdown
        modalTimer = setInterval(() => {
            timeLeft--;
            
            if (timeLeft <= 0) {
                clearInterval(modalTimer);
                document.getElementById('questionModal').classList.remove('active');
                document.querySelector('.answerBox').style.display = 'block'; // Show answer again
                document.querySelector('.modalButtons').style.display = 'flex'; // Show button again
                document.getElementById('timerDisplay').style.display = 'block'; // Show timer again
                gameLoopPaused = false; // Allow game to start
            }
        }, 1000);
    }
}

function showQuestionModal() {
    if (questionIndex < currentTopicQuestions.length) {
        const q = currentTopicQuestions[questionIndex];
        document.getElementById('modalQuestion').textContent = q.question;
        document.getElementById('modalAnswer').textContent = q.answer;
        document.getElementById('questionModal').classList.add('active');
        document.getElementById('modalTimer').textContent = '20';
        
        let timeLeft = 20;
        
        // Clear any existing modal timer
        if (modalTimer) {
            clearInterval(modalTimer);
        }
        
        // Start modal countdown
        modalTimer = setInterval(() => {
            timeLeft--;
            document.getElementById('modalTimer').textContent = timeLeft;
            
            if (timeLeft <= 0) {
                clearInterval(modalTimer);
                nextQuestion();
            }
        }, 1000);
    }
}

function nextQuestion() {
    if (modalTimer) {
        clearInterval(modalTimer);
    }
    
    // Close the modal
    document.getElementById('questionModal').classList.remove('active');
    
    // Move to next question
    questionIndex++;
    
    if (questionIndex < currentTopicQuestions.length) {
        // Update the current question and answer for display in game
        const nextQ = currentTopicQuestions[questionIndex];
        currentQuestion = nextQ.question;
        currentAnswer = nextQ.answer;
        
        // Set new threshold for next question
        nextQuestionThreshold += 50;
        
        // Resume game
        gameLoopPaused = false;
        updateQuestionDisplay();
    } else {
        // All questions for current topic answered, transition to next stage
        gameLoopPaused = false;
        
        if (currentStage === 1) {
            transitionToStage2();
        } else if (currentStage === 2) {
            transitionToStage3();
        } else {
            // All topics completed, end game
            endGame();
        }
    }
}

document.addEventListener('keydown', (e) => {
    if (gameLoopPaused) {
        return;
    }
    
    if (e.key === 'ArrowUp' && dy === 0) {
        dx = 0;
        dy = -1;
        e.preventDefault();
    } else if (e.key === 'ArrowDown' && dy === 0) {
        dx = 0;
        dy = 1;
        e.preventDefault();
    } else if (e.key === 'ArrowLeft' && dx === 0) {
        dx = -1;
        dy = 0;
        e.preventDefault();
    } else if (e.key === 'ArrowRight' && dx === 0) {
        dx = 1;
        dy = 0;
        e.preventDefault();
    }
});

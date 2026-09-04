var QUESTIONS = [
  {
    question: 'Which soil layer holds the most organic matter and nutrients for plant growth?',
    options: ['Bedrock', 'Subsoil', 'Topsoil', 'Parent material'],
    correctIndex: 2,
    explanation: 'Topsoil is the uppermost layer. It holds most of the humus and nutrients, which is why it is the layer farmers care for most.'
  },
  {
    question: 'What is it called when a plant loses water vapour through its leaves?',
    options: ['Photosynthesis', 'Transpiration', 'Respiration', 'Germination'],
    correctIndex: 1,
    explanation: 'Transpiration is water loss through the stomata in leaves. It helps pull water and nutrients up from the roots.'
  },
  {
    question: 'Which of these crops can fix nitrogen in the soil through its roots?',
    options: ['Maize', 'Pearl millet (mahangu)', 'Groundnuts', 'Sorghum'],
    correctIndex: 2,
    explanation: 'Groundnuts are a legume. Legumes host bacteria in their root nodules that convert nitrogen from the air into a form plants can use.'
  },
  {
    question: 'Farming that meets today’s food needs without harming future generations’ ability to meet theirs is called:',
    options: ['Subsistence farming', 'Sustainable agriculture', 'Commercial farming', 'Shifting cultivation'],
    correctIndex: 1,
    explanation: 'Sustainable agriculture balances food production with protecting soil, water, and biodiversity for the long term.'
  },
  {
    question: 'Which practice helps reduce soil erosion on sloped fields?',
    options: ['Monocropping', 'Deep ploughing', 'Contour ploughing', 'Overgrazing'],
    correctIndex: 2,
    explanation: 'Ploughing along the natural contours of a slope slows water run-off and helps hold soil in place.'
  },
  {
    question: 'In livestock farming, what is colostrum?',
    options: ['A type of animal feed', 'The first milk after birth, rich in antibodies', 'A cattle disease', 'A goat breed'],
    correctIndex: 1,
    explanation: 'Colostrum is produced in the first day or two after birth and gives newborn animals their early immunity.'
  },
  {
    question: 'Which of these is a primary macronutrient that plants need in the largest amounts?',
    options: ['Iron', 'Nitrogen', 'Zinc', 'Boron'],
    correctIndex: 1,
    explanation: 'Nitrogen, phosphorus and potassium (N-P-K) are the primary macronutrients. Iron, zinc and boron are needed in much smaller amounts.'
  },
  {
    question: 'Crop rotation is mainly used to prevent:',
    options: ['Overwatering', 'Soil nutrient depletion and pest build-up', 'Fast crop growth', 'Cross-pollination'],
    correctIndex: 1,
    explanation: 'Changing which crop grows in a field each season stops the same nutrients being used up and breaks the life cycle of pests tied to one crop.'
  },
  {
    question: 'What helps a farmer track income and expenses on the farm?',
    options: ['A weather almanac', 'Farm records and accounts', 'A land title deed', 'A seed catalogue'],
    correctIndex: 1,
    explanation: 'Keeping farm records and accounts lets a farmer see whether the farm is making a profit and plan future budgets.'
  },
  {
    question: 'Which irrigation method delivers water directly to plant roots and wastes the least water?',
    options: ['Flood irrigation', 'Sprinkler irrigation', 'Drip irrigation', 'Furrow irrigation'],
    correctIndex: 2,
    explanation: 'Drip irrigation releases water slowly right at the root zone, which is why it is useful where water is limited.'
  },
  {
    question: 'What is the main purpose of fencing on a farm?',
    options: ['Decoration', 'Controlling animal movement and protecting crops', 'Increasing the size of the land', 'Improving soil fertility'],
    correctIndex: 1,
    explanation: 'Fencing keeps livestock where they should be and keeps animals away from crops or dangerous areas.'
  },
  {
    question: 'What does agricultural extension mean?',
    options: ['Extending a farm’s land boundaries', 'Sharing farming knowledge and advice with farmers', 'Artificially extending the growing season', 'A type of farm machinery'],
    correctIndex: 1,
    explanation: 'Agricultural extension officers pass research-based knowledge and practical advice on to farming communities to help improve their practices.'
  }
];


/* Navigation */
(function () {
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('primaryNav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();


/* Footer year */
(function () {
  var yearEl = document.getElementById('year');

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();


/* Image fallback */
function handleImgError(img) {
  img.onerror = null;
  img.src = 'images/placeholder.svg';
}


/* Hero video */
(function () {
  var heroVideo = document.getElementById('heroVideo');

  if (!heroVideo) return;

  heroVideo.addEventListener('canplay', function () {
    heroVideo.classList.add('is-ready');
  });

  heroVideo.addEventListener('error', function () {
    heroVideo.classList.remove('is-ready');
  });
})();


/* Contact form */
(function () {
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');

  if (!form) return;

  var CONTACT_EMAIL = 'gobabsaweedo@gmail.com';

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var name = document.getElementById('contactName').value.trim();
    var email = document.getElementById('contactEmail').value.trim();
    var topic = document.getElementById('contactTopic').value;
    var message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !message) {
      if (status) {
        status.textContent = 'Please complete the required fields.';
        status.classList.add('is-visible');
      }
      return;
    }

    var subject = encodeURIComponent(
      'AgriLearn message (' + topic + ') from ' + name
    );

    var body = encodeURIComponent(
      message + '\n\n— ' + name + ' (' + email + ')'
    );

    window.location.href =
      'mailto:' + CONTACT_EMAIL +
      '?subject=' + subject +
      '&body=' + body;

    if (status) {
      status.textContent =
        'Your email app should now be open with this message ready to send.';
      status.classList.add('is-visible');
    }

    form.reset();
  });
})();


/* Research Hub */
(function () {
  var tabs = document.querySelectorAll('.grade-tab');
  var panels = document.querySelectorAll('.grade-panel');
  var searchInput = document.getElementById('topicSearch');
  var emptyMessage = document.getElementById('hubEmpty');
  var allItems = document.querySelectorAll('.topic-item');

  if (!tabs.length || !panels.length) return;

  function showPanel(grade) {
    panels.forEach(function (panel) {
      panel.hidden = panel.getAttribute('data-panel') !== grade;
    });

    tabs.forEach(function (tab) {
      var isActive = tab.getAttribute('data-grade') === grade;

      tab.classList.toggle('active', isActive);
      tab.setAttribute(
        'aria-selected',
        isActive ? 'true' : 'false'
      );
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      if (searchInput) {
        searchInput.value = '';
      }

      allItems.forEach(function (item) {
        item.hidden = false;
      });

      showPanel(tab.getAttribute('data-grade'));

      if (emptyMessage) {
        emptyMessage.classList.remove('is-visible');
      }
    });
  });

  if (!searchInput) {
    showPanel(tabs[0].getAttribute('data-grade'));
    return;
  }

  searchInput.addEventListener('input', function () {
    var query = searchInput.value.trim().toLowerCase();

    if (!query) {
      allItems.forEach(function (item) {
        item.hidden = false;
      });

      var activeTab =
        document.querySelector('.grade-tab.active') || tabs[0];

      showPanel(activeTab.getAttribute('data-grade'));

      if (emptyMessage) {
        emptyMessage.classList.remove('is-visible');
      }

      return;
    }

    panels.forEach(function (panel) {
      panel.hidden = false;
    });

    tabs.forEach(function (tab) {
      tab.classList.remove('active');
      tab.setAttribute('aria-selected', 'false');
    });

    var visibleCount = 0;

    allItems.forEach(function (item) {
      var text = item.textContent.toLowerCase();
      var matches = text.indexOf(query) !== -1;

      item.hidden = !matches;

      if (matches) {
        visibleCount++;
      }
    });

    if (emptyMessage) {
      emptyMessage.classList.toggle(
        'is-visible',
        visibleCount === 0
      );
    }
  });

  showPanel(tabs[0].getAttribute('data-grade'));
})();


/* Quiz Arena */
(function () {
  var startView = document.querySelector('[data-quiz-view="start"]');
  var playView = document.querySelector('[data-quiz-view="play"]');
  var resultsView = document.querySelector('[data-quiz-view="results"]');

  if (!startView || !playView || !resultsView) return;

  var startBtn = document.getElementById('startQuizBtn');
  var restartBtn = document.getElementById('restartQuizBtn');
  var backBtn = document.getElementById('backToStartBtn');
  var nextBtn = document.getElementById('nextQuestionBtn');

  var progressText = document.getElementById('quizProgressText');
  var progressFill = document.getElementById('quizProgressFill');
  var questionEl = document.getElementById('quizQuestion');
  var optionsEl = document.getElementById('quizOptions');
  var feedbackEl = document.getElementById('quizFeedback');

  var scoreValueEl = document.getElementById('quizScoreValue');
  var resultMessageEl = document.getElementById('quizResultMessage');

  var questions = [];
  var currentIndex = 0;
  var score = 0;
  var answered = false;

  function shuffledQuestions() {
    var copy = QUESTIONS.slice();

    for (var i = copy.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));

      var temp = copy[i];
      copy[i] = copy[j];
      copy[j] = temp;
    }

    return copy;
  }

  function showView(view) {
    [startView, playView, resultsView].forEach(function (el) {
      el.classList.remove('is-active');
    });

    view.classList.add('is-active');
  }

  function renderQuestion() {
    answered = false;

    var q = questions[currentIndex];

    progressText.textContent =
      'Question ' + (currentIndex + 1) +
      ' of ' + questions.length;

    progressFill.style.width =
      Math.round((currentIndex / questions.length) * 100) + '%';

    questionEl.textContent = q.question;

    feedbackEl.classList.remove('is-visible');
    feedbackEl.textContent = '';

    nextBtn.disabled = true;

    nextBtn.textContent =
      currentIndex === questions.length - 1
        ? 'See your results'
        : 'Next question';

    optionsEl.innerHTML = '';

    q.options.forEach(function (optionText, i) {
      var li = document.createElement('li');
      var btn = document.createElement('button');

      btn.type = 'button';
      btn.className = 'quiz-option';
      btn.textContent = optionText;

      btn.addEventListener('click', function () {
        selectOption(i, btn);
      });

      li.appendChild(btn);
      optionsEl.appendChild(li);
    });
  }

  function selectOption(i, btn) {
    if (answered) return;

    answered = true;

    var q = questions[currentIndex];
    var allButtons =
      optionsEl.querySelectorAll('.quiz-option');

    allButtons.forEach(function (button) {
      button.disabled = true;
    });

    if (i === q.correctIndex) {
      score++;

      btn.classList.add('correct');

      feedbackEl.textContent =
        'Correct — ' + q.explanation;
    } else {
      btn.classList.add('incorrect');

      allButtons[q.correctIndex].classList.add('correct');

      feedbackEl.textContent =
        'Not quite — ' + q.explanation;
    }

    feedbackEl.classList.add('is-visible');
    nextBtn.disabled = false;
  }

  function showResults() {
    progressFill.style.width = '100%';

    scoreValueEl.textContent =
      score + ' / ' + questions.length;

    var percentage = score / questions.length;
    var message;

    if (percentage >= 0.8) {
      message =
        'Excellent work — that score is AS-level ready. Try the quiz again any time to keep it sharp.';
    } else if (percentage >= 0.5) {
      message =
        'Solid effort. Revisit the topics you missed in the Research Hub, then have another go.';
    } else {
      message =
        'Good start — head over to the Research Hub to build up these topics, then try again.';
    }

    resultMessageEl.textContent = message;

    showView(resultsView);
  }

  function startQuiz() {
    questions = shuffledQuestions();
    currentIndex = 0;
    score = 0;

    showView(playView);
    renderQuestion();
  }

  startBtn.addEventListener('click', startQuiz);
  restartBtn.addEventListener('click', startQuiz);

  backBtn.addEventListener('click', function () {
    showView(startView);
  });

  nextBtn.addEventListener('click', function () {
    if (nextBtn.disabled) return;

    currentIndex++;

    if (currentIndex >= questions.length) {
      showResults();
    } else {
      renderQuestion();
    }
  });
})();
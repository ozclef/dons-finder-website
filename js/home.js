// Song Finder Homepage JavaScript
// Handles audio recording, file upload, API communication, and UI

// Configuration
const API_BASE_URL = window.location.origin;
const RECORDING_DURATION = 8000; // 8 seconds
const MAX_HISTORY = 20;
const STORAGE_KEY = 'songfinder_web_history';

// Translations
const translations = {
  en: {
    heroTitle: 'Identify Any Song in Seconds',
    heroSubtitle: 'Discover music by recording, humming, or uploading audio files',
    tabRecord: 'Record',
    tabHum: 'Hum/Sing',
    tabUpload: 'Upload',
    recordHint: 'Tap to identify music playing nearby',
    humHint: 'Tap and hum or sing the melody',
    listening: 'Listening...',
    listeningHum: 'Listening to your melody...',
    uploadTitle: 'Drag & drop audio file here',
    uploadHint: 'or click to browse',
    identifyFile: 'Identify File',
    analyzing: 'Analyzing audio...',
    lyrics: 'Lyrics',
    showMore: 'Show More',
    showLess: 'Show Less',
    identifyAnother: 'Identify Another',
    noMatchTitle: 'No Match Found',
    noMatchHint: 'Try again with clearer audio or a different part of the song',
    tryAgain: 'Try Again',
    recentHistory: 'Recent History',
    clearAll: 'Clear All',
    noHistory: 'No songs identified yet. Try identifying a song above!',
    howItWorks: 'How It Works',
    featureRecordTitle: 'Record Audio',
    featureRecordDesc: 'Play music from any source - speakers, TV, or radio - and let us identify it instantly',
    featureHumTitle: 'Hum or Sing',
    featureHumDesc: "Can't remember the name? Just hum or sing the melody and we'll find it for you",
    featureUploadTitle: 'Upload File',
    featureUploadDesc: 'Have an audio file? Upload it directly and get instant results',
    extensionTitle: 'Get the Browser Extension',
    extensionDesc: 'Identify songs playing in any browser tab with just one click. No need to hold your phone up to speakers!',
    extFeature1: 'One-click song identification',
    extFeature2: 'Works on any website with audio',
    extFeature3: 'Get lyrics and platform links',
    extFeature4: 'Save your identification history',
    addToChrome: "Add to Chrome - It's Free",
    getExtension: 'Get Extension',
    about: 'About',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    contact: 'Contact',
    footerTagline: 'Identify any song instantly',
    allRights: 'All rights reserved.',
    micPermissionDenied: 'Microphone permission denied. Please allow microphone access.',
    errorOccurred: 'An error occurred. Please try again.'
  },
  es: {
    heroTitle: 'Identifica Cualquier Canción en Segundos',
    heroSubtitle: 'Descubre música grabando, tarareando o subiendo archivos de audio',
    tabRecord: 'Grabar',
    tabHum: 'Tararear',
    tabUpload: 'Subir',
    recordHint: 'Toca para identificar música cercana',
    humHint: 'Toca y tararea o canta la melodía',
    listening: 'Escuchando...',
    listeningHum: 'Escuchando tu melodía...',
    uploadTitle: 'Arrastra y suelta el archivo de audio aquí',
    uploadHint: 'o haz clic para buscar',
    identifyFile: 'Identificar Archivo',
    analyzing: 'Analizando audio...',
    lyrics: 'Letra',
    showMore: 'Mostrar Más',
    showLess: 'Mostrar Menos',
    identifyAnother: 'Identificar Otra',
    noMatchTitle: 'No Se Encontró Coincidencia',
    noMatchHint: 'Intenta de nuevo con audio más claro o una parte diferente de la canción',
    tryAgain: 'Intentar de Nuevo',
    recentHistory: 'Historial Reciente',
    clearAll: 'Borrar Todo',
    noHistory: '¡Aún no se han identificado canciones. ¡Prueba identificar una canción arriba!',
    howItWorks: 'Cómo Funciona',
    featureRecordTitle: 'Grabar Audio',
    featureRecordDesc: 'Reproduce música de cualquier fuente y la identificamos al instante',
    featureHumTitle: 'Tararear o Cantar',
    featureHumDesc: '¿No recuerdas el nombre? Solo tararea la melodía y la encontraremos',
    featureUploadTitle: 'Subir Archivo',
    featureUploadDesc: '¿Tienes un archivo de audio? Súbelo directamente y obtén resultados',
    extensionTitle: 'Obtén la Extensión del Navegador',
    extensionDesc: 'Identifica canciones en cualquier pestaña del navegador con un solo clic',
    getExtension: 'Obtener Extensión',
    addToChrome: 'Añadir a Chrome - Es Gratis'
  },
  fr: {
    heroTitle: 'Identifiez N\'importe Quelle Chanson en Secondes',
    heroSubtitle: 'Découvrez de la musique en enregistrant, fredonnant ou téléchargeant des fichiers audio',
    tabRecord: 'Enregistrer',
    tabHum: 'Fredonner',
    tabUpload: 'Télécharger',
    recordHint: 'Appuyez pour identifier la musique à proximité',
    humHint: 'Appuyez et fredonnez ou chantez la mélodie',
    listening: 'Écoute en cours...',
    listeningHum: 'Écoute de votre mélodie...',
    analyzing: 'Analyse audio...',
    identifyAnother: 'Identifier une Autre',
    noMatchTitle: 'Aucune Correspondance',
    tryAgain: 'Réessayer',
    recentHistory: 'Historique Récent',
    clearAll: 'Tout Effacer',
    howItWorks: 'Comment Ça Marche',
    getExtension: 'Obtenir l\'Extension'
  },
  de: {
    heroTitle: 'Identifizieren Sie Jeden Song in Sekunden',
    heroSubtitle: 'Entdecken Sie Musik durch Aufnahme, Summen oder Hochladen von Audiodateien',
    tabRecord: 'Aufnehmen',
    tabHum: 'Summen',
    tabUpload: 'Hochladen',
    recordHint: 'Tippen Sie, um Musik in der Nähe zu identifizieren',
    listening: 'Höre zu...',
    analyzing: 'Analysiere Audio...',
    getExtension: 'Erweiterung Holen'
  },
  ar: {
    heroTitle: 'حدد أي أغنية في ثوانٍ',
    heroSubtitle: 'اكتشف الموسيقى عن طريق التسجيل أو الدندنة أو تحميل الملفات الصوتية',
    tabRecord: 'تسجيل',
    tabHum: 'دندن',
    tabUpload: 'تحميل',
    listening: 'جاري الاستماع...',
    analyzing: 'جاري تحليل الصوت...',
    getExtension: 'احصل على الإضافة'
  },
  zh: {
    heroTitle: '几秒钟内识别任何歌曲',
    heroSubtitle: '通过录音、哼唱或上传音频文件来发现音乐',
    tabRecord: '录音',
    tabHum: '哼唱',
    tabUpload: '上传',
    listening: '正在收听...',
    analyzing: '正在分析音频...',
    getExtension: '获取扩展程序'
  },
  ja: {
    heroTitle: '数秒で曲を識別',
    heroSubtitle: '録音、ハミング、またはオーディオファイルのアップロードで音楽を発見',
    tabRecord: '録音',
    tabHum: 'ハミング',
    tabUpload: 'アップロード',
    listening: '聴いています...',
    analyzing: 'オーディオを分析中...',
    getExtension: '拡張機能を入手'
  },
  ko: {
    heroTitle: '몇 초 만에 모든 노래 식별',
    heroSubtitle: '녹음, 허밍 또는 오디오 파일 업로드로 음악을 발견하세요',
    tabRecord: '녹음',
    tabHum: '허밍',
    tabUpload: '업로드',
    listening: '듣는 중...',
    analyzing: '오디오 분석 중...',
    getExtension: '확장 프로그램 받기'
  },
  ru: {
    heroTitle: 'Определите Любую Песню за Секунды',
    heroSubtitle: 'Откройте для себя музыку, записывая, напевая или загружая аудиофайлы',
    tabRecord: 'Запись',
    tabHum: 'Напеть',
    tabUpload: 'Загрузить',
    listening: 'Слушаю...',
    analyzing: 'Анализ аудио...',
    getExtension: 'Получить Расширение'
  },
  hi: {
    heroTitle: 'सेकंडों में किसी भी गाने की पहचान करें',
    heroSubtitle: 'रिकॉर्डिंग, गुनगुनाकर या ऑडियो फाइल अपलोड करके संगीत खोजें',
    tabRecord: 'रिकॉर्ड',
    tabHum: 'गुनगुनाएं',
    tabUpload: 'अपलोड',
    listening: 'सुन रहा है...',
    analyzing: 'ऑडियो विश्लेषण...',
    getExtension: 'एक्सटेंशन प्राप्त करें'
  },
  pt: {
    heroTitle: 'Identifique Qualquer Música em Segundos',
    heroSubtitle: 'Descubra música gravando, cantarolando ou enviando arquivos de áudio',
    tabRecord: 'Gravar',
    tabHum: 'Cantarolar',
    tabUpload: 'Enviar',
    listening: 'Ouvindo...',
    analyzing: 'Analisando áudio...',
    getExtension: 'Obter Extensão'
  },
  tr: {
    heroTitle: 'Saniyeler İçinde Herhangi Bir Şarkıyı Tanımlayın',
    heroSubtitle: 'Kayıt yaparak, mırıldanarak veya ses dosyası yükleyerek müzik keşfedin',
    tabRecord: 'Kaydet',
    tabHum: 'Mırıldan',
    tabUpload: 'Yükle',
    listening: 'Dinliyor...',
    analyzing: 'Ses analiz ediliyor...',
    getExtension: 'Uzantıyı Edinin'
  }
};

// State
let currentLang = localStorage.getItem('songfinder_lang') || 'en';
let mediaRecorder = null;
let audioChunks = [];
let isRecording = false;
let currentMode = 'record'; // 'record' or 'hum'

// DOM Elements
const langBtn = document.getElementById('langBtn');
const langDropdown = document.getElementById('langDropdown');
const tabs = document.querySelectorAll('.tab');
const tabPanes = document.querySelectorAll('.tab-pane');
const recordBtn = document.getElementById('recordBtn');
const humBtn = document.getElementById('humBtn');
const waveform = document.getElementById('waveform');
const humWaveform = document.getElementById('humWaveform');
const listeningText = document.getElementById('listeningText');
const humListeningText = document.getElementById('humListeningText');
const uploadArea = document.getElementById('uploadArea');
const audioFileInput = document.getElementById('audioFile');
const fileInfo = document.getElementById('fileInfo');
const fileName = document.getElementById('fileName');
const removeFileBtn = document.getElementById('removeFile');
const uploadBtn = document.getElementById('uploadBtn');
const processing = document.getElementById('processing');
const resultSection = document.getElementById('resultSection');
const noMatch = document.getElementById('noMatch');
const identifyCard = document.querySelector('.identify-card');
const historyScroll = document.getElementById('historyScroll');
const historyEmpty = document.getElementById('historyEmpty');
const clearHistoryBtn = document.getElementById('clearHistory');
const tryAgainBtn = document.getElementById('tryAgainBtn');
const noMatchRetry = document.getElementById('noMatchRetry');
const lyricsContent = document.querySelector('.lyrics-content');
const expandLyricsBtn = document.getElementById('expandLyrics');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  applyLanguage(currentLang);
  loadHistory();
  setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
  // Language selector - toggle dropdown on button click
  if (langBtn && langDropdown) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle('hidden');
    });

    // Close language dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.language-selector')) {
        langDropdown.classList.add('hidden');
      }
    });
  }

  // Tabs
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.dataset.tab;
      switchTab(tabName);
    });
  });

  // Record buttons
  recordBtn.addEventListener('click', () => startRecording('record'));
  humBtn.addEventListener('click', () => startRecording('hum'));

  // Upload
  uploadArea.addEventListener('click', () => audioFileInput.click());
  uploadArea.addEventListener('dragover', handleDragOver);
  uploadArea.addEventListener('dragleave', handleDragLeave);
  uploadArea.addEventListener('drop', handleDrop);
  audioFileInput.addEventListener('change', handleFileSelect);
  removeFileBtn.addEventListener('click', removeFile);
  uploadBtn.addEventListener('click', uploadFile);

  // Results
  tryAgainBtn.addEventListener('click', resetToIdle);
  noMatchRetry.addEventListener('click', resetToIdle);

  // Lyrics
  expandLyricsBtn.addEventListener('click', toggleLyrics);

  // History
  clearHistoryBtn.addEventListener('click', clearHistory);
}

// Language Functions
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('songfinder_lang', lang);
  applyLanguage(lang);
}

function applyLanguage(lang) {
  const t = translations[lang] || translations.en;

  // Set RTL for Arabic
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;

  // Update all translatable elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key]) {
      el.textContent = t[key];
    } else if (translations.en[key]) {
      el.textContent = translations.en[key];
    }
  });
}

function t(key) {
  const trans = translations[currentLang] || translations.en;
  return trans[key] || translations.en[key] || key;
}

// Tab Functions
function switchTab(tabName) {
  tabs.forEach(tab => {
    tab.classList.toggle('active', tab.dataset.tab === tabName);
  });

  tabPanes.forEach(pane => {
    pane.classList.toggle('active', pane.id === tabName + 'Pane');
  });
}

// Recording Functions
async function startRecording(mode) {
  if (isRecording) {
    stopRecording();
    return;
  }

  currentMode = mode;

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];

    mediaRecorder.ondataavailable = (e) => {
      audioChunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      stream.getTracks().forEach(track => track.stop());
      identifySong(audioBlob, mode);
    };

    mediaRecorder.start();
    isRecording = true;

    // Update UI
    const btn = mode === 'record' ? recordBtn : humBtn;
    const wave = mode === 'record' ? waveform : humWaveform;
    const text = mode === 'record' ? listeningText : humListeningText;
    const hint = btn.parentElement.querySelector('.record-hint');

    btn.classList.add('recording');
    wave.classList.remove('hidden');
    text.classList.remove('hidden');
    if (hint) hint.classList.add('hidden');

    // Auto stop after duration
    setTimeout(() => {
      if (isRecording) {
        stopRecording();
      }
    }, RECORDING_DURATION);

  } catch (error) {
    console.error('Microphone error:', error);
    alert(t('micPermissionDenied'));
  }
}

function stopRecording() {
  if (mediaRecorder && isRecording) {
    mediaRecorder.stop();
    isRecording = false;

    // Reset UI
    const btn = currentMode === 'record' ? recordBtn : humBtn;
    const wave = currentMode === 'record' ? waveform : humWaveform;
    const text = currentMode === 'record' ? listeningText : humListeningText;
    const hint = btn.parentElement.querySelector('.record-hint');

    btn.classList.remove('recording');
    wave.classList.add('hidden');
    text.classList.add('hidden');
    if (hint) hint.classList.remove('hidden');
  }
}

// Upload Functions
function handleDragOver(e) {
  e.preventDefault();
  uploadArea.classList.add('dragover');
}

function handleDragLeave(e) {
  e.preventDefault();
  uploadArea.classList.remove('dragover');
}

function handleDrop(e) {
  e.preventDefault();
  uploadArea.classList.remove('dragover');

  const files = e.dataTransfer.files;
  if (files.length > 0) {
    handleFile(files[0]);
  }
}

function handleFileSelect(e) {
  if (e.target.files.length > 0) {
    handleFile(e.target.files[0]);
  }
}

function handleFile(file) {
  if (!file.type.startsWith('audio/')) {
    alert('Please select an audio file');
    return;
  }

  fileName.textContent = file.name;
  fileInfo.classList.remove('hidden');
  uploadArea.classList.add('hidden');
  uploadBtn.classList.remove('hidden');
  uploadBtn.dataset.file = 'ready';
}

function removeFile() {
  audioFileInput.value = '';
  fileInfo.classList.add('hidden');
  uploadArea.classList.remove('hidden');
  uploadBtn.classList.add('hidden');
  delete uploadBtn.dataset.file;
}

function uploadFile() {
  const file = audioFileInput.files[0];
  if (file) {
    identifySong(file, 'upload');
  }
}

// API Functions
async function identifySong(audioData, mode) {
  showProcessing();

  try {
    const formData = new FormData();
    formData.append('audio', audioData, 'recording.webm');

    // Use web API endpoints (no API key needed, uses origin-based auth)
    const endpoint = mode === 'hum' ? '/api/web/identify/hum' : '/api/web/identify';

    const response = await fetch(API_BASE_URL + endpoint, {
      method: 'POST',
      body: formData
    });

    const result = await response.json();

    if (result.success && result.song) {
      showResult(result.song);
      saveToHistory(result.song);
    } else {
      showNoMatch();
    }
  } catch (error) {
    console.error('Identification error:', error);
    showNoMatch();
  }
}

// UI State Functions
function showProcessing() {
  identifyCard.querySelector('.tab-content').classList.add('hidden');
  processing.classList.remove('hidden');
  resultSection.classList.add('hidden');
  noMatch.classList.add('hidden');
}

function showResult(song) {
  processing.classList.add('hidden');
  identifyCard.querySelector('.tab-content').classList.add('hidden');
  resultSection.classList.remove('hidden');
  noMatch.classList.add('hidden');

  // Populate result
  document.getElementById('resultAlbumArt').src = song.album_art || '/images/default-album.png';
  document.getElementById('resultTitle').textContent = song.title;
  document.getElementById('resultArtist').textContent = song.artist;
  document.getElementById('resultAlbum').textContent = song.album || '';

  // Platform links
  const spotifyLink = document.getElementById('spotifyLink');
  const youtubeLink = document.getElementById('youtubeLink');
  const deezerLink = document.getElementById('deezerLink');

  if (song.spotify_id) {
    spotifyLink.href = `https://open.spotify.com/track/${song.spotify_id}`;
    spotifyLink.classList.remove('hidden');
  } else {
    spotifyLink.href = `https://open.spotify.com/search/${encodeURIComponent(song.title + ' ' + song.artist)}`;
  }

  if (song.youtube_id) {
    youtubeLink.href = `https://www.youtube.com/watch?v=${song.youtube_id}`;
  } else {
    youtubeLink.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(song.title + ' ' + song.artist)}`;
  }

  if (song.deezer_id) {
    deezerLink.href = `https://www.deezer.com/track/${song.deezer_id}`;
  } else {
    deezerLink.href = `https://www.deezer.com/search/${encodeURIComponent(song.title + ' ' + song.artist)}`;
  }

  // Lyrics
  const lyricsSection = document.getElementById('lyricsSection');
  const lyricsText = document.getElementById('lyricsText');

  if (song.lyrics) {
    lyricsText.textContent = song.lyrics;
    lyricsSection.classList.remove('hidden');
    lyricsContent.classList.remove('expanded');
    expandLyricsBtn.textContent = t('showMore');
  } else {
    lyricsSection.classList.add('hidden');
  }
}

function showNoMatch() {
  processing.classList.add('hidden');
  identifyCard.querySelector('.tab-content').classList.add('hidden');
  resultSection.classList.add('hidden');
  noMatch.classList.remove('hidden');
}

function resetToIdle() {
  processing.classList.add('hidden');
  identifyCard.querySelector('.tab-content').classList.remove('hidden');
  resultSection.classList.add('hidden');
  noMatch.classList.add('hidden');
  removeFile();
}

function toggleLyrics() {
  const isExpanded = lyricsContent.classList.toggle('expanded');
  expandLyricsBtn.textContent = isExpanded ? t('showLess') : t('showMore');
}

// History Functions
function loadHistory() {
  const history = getHistory();

  if (history.length === 0) {
    historyScroll.classList.add('hidden');
    historyEmpty.classList.remove('hidden');
    return;
  }

  historyScroll.classList.remove('hidden');
  historyEmpty.classList.add('hidden');
  historyScroll.innerHTML = '';

  history.forEach(song => {
    const item = createHistoryItem(song);
    historyScroll.appendChild(item);
  });
}

function createHistoryItem(song) {
  const item = document.createElement('div');
  item.className = 'history-item';
  item.innerHTML = `
    <div class="history-item-art">
      <img src="${song.album_art || '/images/default-album.png'}" alt="${song.title}">
    </div>
    <div class="history-item-info">
      <div class="history-item-title">${escapeHtml(song.title)}</div>
      <div class="history-item-artist">${escapeHtml(song.artist)}</div>
    </div>
  `;

  item.addEventListener('click', () => showResult(song));

  return item;
}

function saveToHistory(song) {
  const history = getHistory();

  // Remove if already exists
  const existingIndex = history.findIndex(s => s.acrid === song.acrid);
  if (existingIndex !== -1) {
    history.splice(existingIndex, 1);
  }

  // Add to beginning
  history.unshift({
    ...song,
    identified_at: new Date().toISOString()
  });

  // Keep only max items
  if (history.length > MAX_HISTORY) {
    history.splice(MAX_HISTORY);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  loadHistory();
}

function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function clearHistory() {
  if (confirm('Clear all history?')) {
    localStorage.removeItem(STORAGE_KEY);
    loadHistory();
  }
}

// Utility Functions
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

//Musicana Player - JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playIcon = document.getElementById('play-icon');
    const mobilePlayPauseBtn = document.getElementById('mobile-play-pause-btn');
    const mobilePlayIcon = document.getElementById('mobile-play-icon');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const mobilePrevBtn = document.getElementById('mobile-prev-btn');
    const mobileNextBtn = document.getElementById('mobile-next-btn');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const repeatBtn = document.getElementById('repeat-btn');
    const progressBar = document.getElementById('progress-bar');
    const volumeBar = document.getElementById('volume-bar');
    const currentTimeEl = document.getElementById('current-time');
    const totalTimeEl = document.getElementById('total-time');
    const nowPlayingImg = document.getElementById('now-playing-img');
    const nowPlayingTitle = document.getElementById('now-playing-title');
    const nowPlayingArtist = document.getElementById('now-playing-artist');
    const mobileTrackImg = document.getElementById('mobile-track-img');
    const mobileTrackTitle = document.getElementById('mobile-track-title');
    const mobileTrackArtist = document.getElementById('mobile-track-artist');
    
    // Fullscreen Player elements (Mobile Only)
    const fullscreenPlayer = document.getElementById('fullscreen-player');
    const fullscreenPlayerClose = document.getElementById('fullscreen-player-close');
    const fullscreenTrackImg = document.getElementById('fullscreen-track-img');
    const fullscreenTrackTitle = document.getElementById('fullscreen-track-title');
    const fullscreenTrackArtist = document.getElementById('fullscreen-track-artist');
    const fullscreenPlayPauseBtn = document.getElementById('fullscreen-play-pause-btn');
    const fullscreenPlayIcon = document.getElementById('fullscreen-play-icon');
    const fullscreenPrevBtn = document.getElementById('fullscreen-prev-btn');
    const fullscreenNextBtn = document.getElementById('fullscreen-next-btn');
    const fullscreenShuffleBtn = document.getElementById('fullscreen-shuffle-btn');
    const fullscreenRepeatBtn = document.getElementById('fullscreen-repeat-btn');
    const fullscreenProgressBar = document.getElementById('fullscreen-progress-bar');
    const fullscreenProgressContainer = document.getElementById('fullscreen-progress-container');
    const fullscreenCurrentTime = document.getElementById('fullscreen-current-time');
    const fullscreenTotalTime = document.getElementById('fullscreen-total-time');
    const mobilePlayerExpandTrigger = document.getElementById('mobile-player-expand-trigger');
    
    // Sidebar elements
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeSidebarBtn = document.getElementById('close-sidebar');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    
    // Playlists Data with songs
    const playlistsData = {
        1: {
            id: 1,
            name: "My Favorites",
            description: "Your favorite tracks all in one place",
            cover: "http://static.photos/music/200x200/10",
            songs: [1, 2, 3, 4, 5]
        },
        2: {
            id: 2,
            name: "Workout Mix",
            description: "High energy tracks to power your workout",
            cover: "http://static.photos/music/200x200/11",
            songs: [2, 4, 5, 1]
        },
        3: {
            id: 3,
            name: "Study Beats",
            description: "Focus-enhancing instrumental tracks",
            cover: "http://static.photos/music/200x200/12",
            songs: [1, 3, 5]
        },
        4: {
            id: 4,
            name: "Road Trip",
            description: "Perfect songs for long drives",
            cover: "http://static.photos/music/200x200/13",
            songs: [1, 2, 3, 4, 5]
        },
        5: {
            id: 5,
            name: "Party Vibes",
            description: "Get the party started",
            cover: "http://static.photos/music/200x200/14",
            songs: [2, 4, 5]
        },
        6: {
            id: 6,
            name: "Chill Evening",
            description: "Relaxing tunes for winding down",
            cover: "http://static.photos/music/200x200/15",
            songs: [1, 3]
        },
        7: {
            id: 7,
            name: "Morning Commute",
            description: "Start your day right",
            cover: "http://static.photos/music/200x200/16",
            songs: [1, 2, 3]
        },
        8: {
            id: 8,
            name: "Sleep Sounds",
            description: "Peaceful music for better sleep",
            cover: "http://static.photos/music/200x200/17",
            songs: [1, 3, 5]
        },
        9: {
            id: 9,
            name: "Dinner Party",
            description: "Sophisticated background music",
            cover: "http://static.photos/music/200x200/18",
            songs: [1, 2, 3, 4]
        }
    };
    
    // Sample Music Data
    const musicLibrary = [
        {
            id: 1,
            title: "Midnight City",
            artist: "M83",
            album: "Hurry Up, We're Dreaming",
            duration: "4:04",
            cover: "http://static.photos/technology/200x200/1",
            audioUrl: "https://assets.codepen.io/4358584/Andromedik%20-%20Light.mp3"
        },
        {
            id: 2,
            title: "Blinding Lights",
            artist: "The Weeknd",
            album: "After Hours",
            duration: "3:22",
            cover: "http://static.photos/technology/200x200/2",
            audioUrl: "https://assets.codepen.io/4358584/Arcando%20-%20Find%20Me.mp3"
        },
        {
            id: 3,
            title: "Levitating",
            artist: "Dua Lipa",
            album: "Future Nostalgia",
            duration: "3:24",
            cover: "http://static.photos/technology/200x200/3",
            audioUrl: "https://assets.codepen.io/4358584/Astronaut%20In%20The%20Ocean%20-%20Masked%20Wolf.mp3"
        },
        {
            id: 4,
            title: "Stay",
            artist: "The Kid LAROI, Justin Bieber",
            album: "F*CK LOVE 3",
            duration: "2:21",
            cover: "http://static.photos/technology/200x200/4",
            audioUrl: "https://assets.codepen.io/4358584/Bensound%20-%20Better%20Days.mp3"
        },
        {
            id: 5,
            title: "Good 4 U",
            artist: "Olivia Rodrigo",
            album: "SOUR",
            duration: "2:58",
            cover: "http://static.photos/technology/200x200/5",
            audioUrl: "https://assets.codepen.io/4358584/Diviners%20-%20Illuminate.mp3"
        }
    ];
    
    // Player State
    let currentTrackIndex = 0;
    let isPlaying = false;
    let isShuffled = false;
    let isRepeated = false;
    let originalTrackOrder = [...musicLibrary];
    let shuffledTracks = [];
    
    // Sidebar Toggle Functions
    function toggleSidebar() {
        if (sidebar && sidebarOverlay) {
            sidebar.classList.toggle('-translate-x-full');
            sidebarOverlay.classList.toggle('hidden');
            document.body.classList.toggle('overflow-hidden');
        }
    }
    
    function closeSidebar() {
        if (sidebar && sidebarOverlay) {
            sidebar.classList.add('-translate-x-full');
            sidebarOverlay.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    }
    
    // Setup sidebar event listeners
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleSidebar);
    }
    
    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', closeSidebar);
    }
    
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }
    
    // Close sidebar on window resize to desktop, and close fullscreen player on tablet+
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 1024) {
            closeSidebar();
        }
        // Close fullscreen player when resizing to tablet/desktop (640px+)
        if (window.innerWidth >= 640 && fullscreenPlayer) {
            fullscreenPlayer.classList.remove('active');
            document.body.classList.remove('overflow-hidden');
        }
    });
    
    // Make toggleSidebar available globally for inline onclick
    window.toggleSidebar = toggleSidebar;
    
    // Initialize Player
    function initPlayer() {
        // Check if we're on a page with audio player
        if (!audioPlayer) {
            console.log("No audio player found on this page.");
            return;
        }
        
        loadTrack(currentTrackIndex);
        updatePlayPauseButtons();
        setupEventListeners();
        
        // Set initial volume
        audioPlayer.volume = 0.7;
        
        // Only set volume bar if it exists
        if (volumeBar) {
            volumeBar.style.width = '70%';
        }
        
        // Update total time
        audioPlayer.addEventListener('loadedmetadata', function() {
            if (totalTimeEl) {
                totalTimeEl.textContent = formatTime(audioPlayer.duration);
            }
        });
    }
    
    // Load a track
    function loadTrack(index) {
        const track = musicLibrary[index];
        
        // Update audio source
        audioPlayer.src = track.audioUrl;
        
        // Update UI - Desktop
        if (nowPlayingTitle) nowPlayingTitle.textContent = track.title;
        if (nowPlayingArtist) nowPlayingArtist.textContent = track.artist;
        if (nowPlayingImg) nowPlayingImg.src = track.cover;
        
        // Update UI - Mobile
        if (mobileTrackTitle) mobileTrackTitle.textContent = track.title;
        if (mobileTrackArtist) mobileTrackArtist.textContent = track.artist;
        if (mobileTrackImg) mobileTrackImg.src = track.cover;
        
        // Update UI - Fullscreen Player (Mobile Only)
        if (fullscreenTrackTitle) fullscreenTrackTitle.textContent = track.title;
        if (fullscreenTrackArtist) fullscreenTrackArtist.textContent = track.artist;
        if (fullscreenTrackImg) fullscreenTrackImg.src = track.cover;
        
        // Reset progress
        if (progressBar) progressBar.style.width = '0%';
        if (fullscreenProgressBar) fullscreenProgressBar.style.width = '0%';
        if (currentTimeEl) currentTimeEl.textContent = '0:00';
        if (fullscreenCurrentTime) fullscreenCurrentTime.textContent = '0:00';
        
        // Update total time
        setTimeout(() => {
            if (!isNaN(audioPlayer.duration) && totalTimeEl) {
                totalTimeEl.textContent = formatTime(audioPlayer.duration);
            }
        }, 500);
    }
    
    // Format time (seconds to MM:SS)
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    // Update play/pause buttons
    function updatePlayPauseButtons() {
        if (playIcon) {
            if (isPlaying) {
                playIcon.classList.remove('fa-play');
                playIcon.classList.add('fa-pause');
            } else {
                playIcon.classList.remove('fa-pause');
                playIcon.classList.add('fa-play');
            }
        }
        
        if (mobilePlayIcon) {
            if (isPlaying) {
                mobilePlayIcon.classList.remove('fa-play');
                mobilePlayIcon.classList.add('fa-pause');
            } else {
                mobilePlayIcon.classList.remove('fa-pause');
                mobilePlayIcon.classList.add('fa-play');
            }
        }
        
        if (playPauseBtn) {
            if (isPlaying) {
                playPauseBtn.classList.add('playing');
            } else {
                playPauseBtn.classList.remove('playing');
            }
        }
        
        if (mobilePlayPauseBtn) {
            if (isPlaying) {
                mobilePlayPauseBtn.classList.add('playing');
            } else {
                mobilePlayPauseBtn.classList.remove('playing');
            }
        }
        
        // Update fullscreen player play/pause button
        if (fullscreenPlayIcon) {
            if (isPlaying) {
                fullscreenPlayIcon.classList.remove('fa-play');
                fullscreenPlayIcon.classList.add('fa-pause');
            } else {
                fullscreenPlayIcon.classList.remove('fa-pause');
                fullscreenPlayIcon.classList.add('fa-play');
            }
        }
    }
    
    // Play or pause the track
    function togglePlayPause() {
        if (isPlaying) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }
        
        isPlaying = !isPlaying;
        updatePlayPauseButtons();
    }
    
    // Play next track
    function playNextTrack() {
        currentTrackIndex = (currentTrackIndex + 1) % musicLibrary.length;
        loadTrack(currentTrackIndex);
        
        if (isPlaying) {
            audioPlayer.play();
        }
        
        // Add animation to next button
        if (nextBtn) {
            nextBtn.classList.add('active');
            setTimeout(() => nextBtn.classList.remove('active'), 300);
        }
        if (mobileNextBtn) {
            mobileNextBtn.classList.add('active');
            setTimeout(() => mobileNextBtn.classList.remove('active'), 300);
        }
    }
    
    // Play previous track
    function playPrevTrack() {
        currentTrackIndex = (currentTrackIndex - 1 + musicLibrary.length) % musicLibrary.length;
        loadTrack(currentTrackIndex);
        
        if (isPlaying) {
            audioPlayer.play();
        }
        
        // Add animation to prev button
        if (prevBtn) {
            prevBtn.classList.add('active');
            setTimeout(() => prevBtn.classList.remove('active'), 300);
        }
        if (mobilePrevBtn) {
            mobilePrevBtn.classList.add('active');
            setTimeout(() => mobilePrevBtn.classList.remove('active'), 300);
        }
    }
    
    // Toggle shuffle
    function toggleShuffle() {
        isShuffled = !isShuffled;
        
        if (shuffleBtn) {
            if (isShuffled) {
                shuffleBtn.style.color = '#8B5CF6';
                shuffleBtn.style.backgroundColor = 'rgba(139, 92, 246, 0.2)';
                
                // Create shuffled array
                shuffledTracks = [...musicLibrary];
                for (let i = shuffledTracks.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffledTracks[i], shuffledTracks[j]] = [shuffledTracks[j], shuffledTracks[i]];
                }
                
                // Find current track in shuffled array
                const currentTrack = musicLibrary[currentTrackIndex];
                const newIndex = shuffledTracks.findIndex(track => track.id === currentTrack.id);
                
                // Update musicLibrary and currentTrackIndex
                musicLibrary.length = 0;
                musicLibrary.push(...shuffledTracks);
                currentTrackIndex = newIndex;
            } else {
                shuffleBtn.style.color = 'white';
                shuffleBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                
                // Restore original order
                const currentTrack = musicLibrary[currentTrackIndex];
                musicLibrary.length = 0;
                musicLibrary.push(...originalTrackOrder);
                
                // Find current track in original array
                currentTrackIndex = originalTrackOrder.findIndex(track => track.id === currentTrack.id);
            }
        }
    }
    
    // Toggle repeat
    function toggleRepeat() {
        isRepeated = !isRepeated;
        
        if (repeatBtn) {
            if (isRepeated) {
                repeatBtn.style.color = '#8B5CF6';
                repeatBtn.style.backgroundColor = 'rgba(139, 92, 246, 0.2)';
            } else {
                repeatBtn.style.color = 'white';
                repeatBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }
        }
    }
    
    // Update progress bar
    function updateProgress() {
        if (!audioPlayer) return;
        
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;
        
        if (duration) {
            const progressPercent = (currentTime / duration) * 100;
            if (progressBar) {
                progressBar.style.width = `${progressPercent}%`;
            }
            if (fullscreenProgressBar) {
                fullscreenProgressBar.style.width = `${progressPercent}%`;
            }
            if (currentTimeEl) {
                currentTimeEl.textContent = formatTime(currentTime);
            }
            if (fullscreenCurrentTime) {
                fullscreenCurrentTime.textContent = formatTime(currentTime);
            }
            if (fullscreenTotalTime) {
                fullscreenTotalTime.textContent = formatTime(duration);
            }
        }
    }
    
    // Set progress on click
    function setProgress(e) {
        if (!audioPlayer) return;
        
        const rect = this.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const duration = audioPlayer.duration;
        
        if (duration) {
            audioPlayer.currentTime = (clickX / width) * duration;
        }
    }
    
    // Set volume
    function setVolume(e) {
        if (!audioPlayer) return;
        
        const rect = this.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const volume = Math.max(0, Math.min(1, clickX / width));
        
        audioPlayer.volume = volume;
        if (volumeBar) {
            volumeBar.style.width = `${volume * 100}%`;
        }
    }
    
    // Play track from recent or charts
    function playTrackFromList(title, artist) {
        if (!audioPlayer) return;
        
        // Find the track in the library
        const trackIndex = musicLibrary.findIndex(track => 
            track.title === title && track.artist === artist);
        
        if (trackIndex !== -1) {
            currentTrackIndex = trackIndex;
            loadTrack(currentTrackIndex);
            
            if (!isPlaying) {
                togglePlayPause();
            } else {
                audioPlayer.play();
            }
        }
    }
    
    // Setup event listeners
    function setupEventListeners() {
        // Only attach player event listeners if we have an audio player
        if (audioPlayer) {
            // Play/Pause buttons
            if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlayPause);
            if (mobilePlayPauseBtn) mobilePlayPauseBtn.addEventListener('click', togglePlayPause);
            
            // Next/Prev buttons
            if (nextBtn) nextBtn.addEventListener('click', playNextTrack);
            if (mobileNextBtn) mobileNextBtn.addEventListener('click', playNextTrack);
            if (prevBtn) prevBtn.addEventListener('click', playPrevTrack);
            if (mobilePrevBtn) mobilePrevBtn.addEventListener('click', playPrevTrack);
            
            // Shuffle and Repeat buttons
            if (shuffleBtn) shuffleBtn.addEventListener('click', toggleShuffle);
            if (repeatBtn) repeatBtn.addEventListener('click', toggleRepeat);
            
            // Progress bar click
            const progressContainer = document.getElementById('progress-bar-container');
            if (progressContainer) {
                progressContainer.addEventListener('click', setProgress);
            }
            
            // Volume bar click
            const volumeContainer = document.getElementById('volume-bar-container');
            if (volumeContainer) {
                volumeContainer.addEventListener('click', setVolume);
            }
            
            // Audio events
            audioPlayer.addEventListener('timeupdate', updateProgress);
            audioPlayer.addEventListener('ended', function() {
                if (isRepeated) {
                    audioPlayer.currentTime = 0;
                    audioPlayer.play();
                } else {
                    playNextTrack();
                }
            });
            
            // Fullscreen Player Event Listeners (Mobile Only)
            // Open fullscreen player when tapping on mobile mini-player track info
            if (mobilePlayerExpandTrigger && fullscreenPlayer) {
                mobilePlayerExpandTrigger.addEventListener('click', function(e) {
                    // Only open fullscreen on mobile (check screen width)
                    if (window.innerWidth < 640) {
                        openFullscreenPlayer();
                    }
                });
            }
            
            // Close fullscreen player
            if (fullscreenPlayerClose) {
                fullscreenPlayerClose.addEventListener('click', closeFullscreenPlayer);
            }
            
            // Fullscreen player controls
            if (fullscreenPlayPauseBtn) {
                fullscreenPlayPauseBtn.addEventListener('click', togglePlayPause);
            }
            if (fullscreenPrevBtn) {
                fullscreenPrevBtn.addEventListener('click', playPrevTrack);
            }
            if (fullscreenNextBtn) {
                fullscreenNextBtn.addEventListener('click', playNextTrack);
            }
            if (fullscreenShuffleBtn) {
                fullscreenShuffleBtn.addEventListener('click', function() {
                    toggleShuffle();
                    updateFullscreenShuffleRepeatButtons();
                });
            }
            if (fullscreenRepeatBtn) {
                fullscreenRepeatBtn.addEventListener('click', function() {
                    toggleRepeat();
                    updateFullscreenShuffleRepeatButtons();
                });
            }
            
            // Fullscreen progress bar click
            if (fullscreenProgressContainer) {
                fullscreenProgressContainer.addEventListener('click', function(e) {
                    setProgress.call(this, e);
                });
            }
        }
        
        // Play track buttons in recent and charts
        const playTrackButtons = document.querySelectorAll('.play-track-btn');
        playTrackButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const trackElement = this.closest('.recent-track, .chart-item');
                if (!trackElement) return;
                
                const title = trackElement.querySelector('h3')?.textContent;
                const artist = trackElement.querySelector('p')?.textContent;
                
                if (title && artist && audioPlayer) {
                    playTrackFromList(title, artist);
                }
                
                // Add animation to the clicked button
                this.classList.add('active');
                setTimeout(() => {
                    this.classList.remove('active');
                }, 300);
            });
        });
        
        // Playlist cards
        const playlistCards = document.querySelectorAll('.playlist-card');
        playlistCards.forEach(card => {
            card.addEventListener('click', function() {
                // Add animation
                this.classList.add('active');
                setTimeout(() => {
                    this.classList.remove('active');
                }, 300);
                
                // Show a notification
                showNotification('Playlist started playing');
            });
        });
        
        // Playlist items in sidebar (non-link items only)
        const playlistItems = document.querySelectorAll('.playlist-item:not(:has(a))');
        playlistItems.forEach(item => {
            item.addEventListener('click', function() {
                const playlistName = this.querySelector('span')?.textContent;
                if (playlistName) {
                    showNotification(`Opening ${playlistName} playlist`);
                }
            });
        });
        
        // UPDATED: Search functionality with dropdown suggestions
        // Shows matching songs in a dropdown as user types
        // Does NOT filter Recently Played or Top Charts sections
        const searchInput = document.getElementById('search-input');
        const searchDropdown = document.getElementById('search-dropdown');
        const searchResults = document.getElementById('search-results');
        
        if (searchInput && searchDropdown && searchResults) {
            searchInput.addEventListener('input', function(e) {
                const searchQuery = this.value.toLowerCase().trim();
                
                // If search is empty, hide dropdown
                if (searchQuery === '') {
                    searchDropdown.classList.add('hidden');
                    searchResults.innerHTML = '';
                    return;
                }
                
                // Filter songs from musicLibrary by title or artist (case-insensitive, contains match)
                const matches = musicLibrary.filter(song => 
                    song.title.toLowerCase().includes(searchQuery) ||
                    song.artist.toLowerCase().includes(searchQuery)
                );
                
                // Show dropdown
                searchDropdown.classList.remove('hidden');
                
                // Populate results
                if (matches.length === 0) {
                    searchResults.innerHTML = '<div class="px-4 py-3 text-gray-400 text-sm">No results found</div>';
                } else {
                    searchResults.innerHTML = matches.map(song => `
                        <div class="search-result-item px-4 py-3 hover:bg-gray-700/50 cursor-pointer transition-colors flex items-center gap-3" data-track-id="${song.id}">
                            <img src="${song.cover}" alt="${song.title}" class="w-10 h-10 rounded object-cover">
                            <div class="flex-1 min-w-0">
                                <p class="text-white text-sm font-medium truncate">${song.title}</p>
                                <p class="text-gray-400 text-xs truncate">${song.artist}</p>
                            </div>
                        </div>
                    `).join('');
                    
                    // Add click handlers to search results
                    searchResults.querySelectorAll('.search-result-item').forEach(item => {
                        item.addEventListener('click', function() {
                            const trackId = parseInt(this.getAttribute('data-track-id'));
                            // Find track index in musicLibrary
                            const trackIndex = musicLibrary.findIndex(t => t.id === trackId);
                            if (trackIndex !== -1) {
                                currentTrackIndex = trackIndex;
                                loadTrack(currentTrackIndex);
                                // Play the selected track immediately
                                audioPlayer.play();
                                isPlaying = true;
                                updatePlayPauseButtons();
                                // Close dropdown and clear search
                                searchDropdown.classList.add('hidden');
                                searchInput.value = '';
                                searchResults.innerHTML = '';
                            }
                        });
                    });
                }
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
                    searchDropdown.classList.add('hidden');
                }
            });
        }
        
        // Close sidebar when clicking on a navigation link (on mobile)
        document.querySelectorAll('.nav-item a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 1024) {
                    closeSidebar();
                }
            });
        });
    }
    
    // Open fullscreen player (Mobile Only)
    function openFullscreenPlayer() {
        if (fullscreenPlayer && window.innerWidth < 640) {
            fullscreenPlayer.classList.add('active');
            document.body.classList.add('overflow-hidden');
            updateFullscreenShuffleRepeatButtons();
        }
    }
    
    // Close fullscreen player
    function closeFullscreenPlayer() {
        if (fullscreenPlayer) {
            fullscreenPlayer.classList.remove('active');
            document.body.classList.remove('overflow-hidden');
        }
    }
    
    // Update fullscreen shuffle/repeat button states
    function updateFullscreenShuffleRepeatButtons() {
        if (fullscreenShuffleBtn) {
            if (isShuffled) {
                fullscreenShuffleBtn.classList.add('active');
            } else {
                fullscreenShuffleBtn.classList.remove('active');
            }
        }
        if (fullscreenRepeatBtn) {
            if (isRepeated) {
                fullscreenRepeatBtn.classList.add('active');
            } else {
                fullscreenRepeatBtn.classList.remove('active');
            }
        }
    }
    
    // Show notification
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'fixed bottom-20 sm:bottom-24 right-4 sm:right-6 bg-gray-800 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-lg z-[60] transform translate-x-full transition-transform duration-300 text-sm sm:text-base max-w-[calc(100%-2rem)]';
        notification.textContent = message;
        
        // Add to body
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(calc(100% + 1rem))';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Initialize the player
    initPlayer();
    
    // Initialize Playlist Details Page
    initPlaylistDetails();
    
    // Playlist Details Page Functions
    function initPlaylistDetails() {
        // Check if we're on the playlist details page
        const playlistTracksMobile = document.getElementById('playlist-tracks-mobile');
        const playlistTracksDesktop = document.getElementById('playlist-tracks-desktop');
        
        if (!playlistTracksMobile || !playlistTracksDesktop) return;
        
        // Get playlist ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const playlistId = parseInt(urlParams.get('id'));
        
        if (!playlistId || !playlistsData[playlistId]) {
            // Show empty state or redirect
            const emptyState = document.getElementById('playlist-empty');
            if (emptyState) {
                emptyState.classList.remove('hidden');
            }
            return;
        }
        
        const playlist = playlistsData[playlistId];
        
        // Update page title
        document.title = `${playlist.name} - Musicana`;
        
        // Update header info
        const playlistTitle = document.getElementById('playlist-title');
        const playlistDescription = document.getElementById('playlist-description');
        const playlistCover = document.getElementById('playlist-cover');
        
        if (playlistTitle) playlistTitle.textContent = playlist.name;
        if (playlistDescription) playlistDescription.textContent = playlist.description;
        if (playlistCover) {
            playlistCover.querySelector('img').src = playlist.cover;
        }
        
        // Get songs for this playlist
        const playlistSongs = playlist.songs.map(songId => 
            musicLibrary.find(song => song.id === songId)
        ).filter(Boolean);
        
        // Update stats
        const songCountEl = document.getElementById('playlist-song-count');
        const durationEl = document.getElementById('playlist-duration');
        const artistsEl = document.getElementById('playlist-artists');
        
        if (songCountEl) songCountEl.textContent = playlistSongs.length;
        
        // Calculate total duration (approximate since we have duration strings)
        const uniqueArtists = [...new Set(playlistSongs.map(s => s.artist))];
        if (artistsEl) artistsEl.textContent = uniqueArtists.length;
        
        // Calculate approximate duration
        let totalMinutes = 0;
        playlistSongs.forEach(song => {
            const parts = song.duration.split(':');
            totalMinutes += parseInt(parts[0]) + parseInt(parts[1]) / 60;
        });
        if (durationEl) durationEl.textContent = `${Math.round(totalMinutes)}m`;
        
        // Render songs
        renderPlaylistSongs(playlistSongs, playlistTracksMobile, playlistTracksDesktop);
        
        // Setup Play All and Shuffle buttons
        const playAllBtn = document.getElementById('play-all-btn');
        const shufflePlaylistBtn = document.getElementById('shuffle-playlist-btn');
        
        if (playAllBtn) {
            playAllBtn.addEventListener('click', function() {
                if (playlistSongs.length > 0) {
                    playTrackById(playlistSongs[0].id);
                }
            });
        }
        
        if (shufflePlaylistBtn) {
            shufflePlaylistBtn.addEventListener('click', function() {
                if (playlistSongs.length > 0) {
                    const randomIndex = Math.floor(Math.random() * playlistSongs.length);
                    playTrackById(playlistSongs[randomIndex].id);
                }
            });
        }
    }
    
    function renderPlaylistSongs(songs, mobileContainer, desktopContainer) {
        // Clear containers
        mobileContainer.innerHTML = '';
        desktopContainer.innerHTML = '';
        
        if (songs.length === 0) {
            const emptyState = document.getElementById('playlist-empty');
            if (emptyState) {
                emptyState.classList.remove('hidden');
            }
            return;
        }
        
        songs.forEach((song, index) => {
            // Mobile card
            const mobileCard = document.createElement('div');
            mobileCard.className = 'bg-gray-800/30 rounded-xl p-3 border border-gray-700/50 cursor-pointer hover:bg-gray-800/50 transition-colors';
            mobileCard.innerHTML = `
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <img src="${song.cover}" alt="${song.title}" class="w-full h-full object-cover">
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="font-medium text-sm truncate">${song.title}</h3>
                        <p class="text-gray-400 text-xs truncate">${song.artist}</p>
                    </div>
                    <div class="flex gap-2">
                        <button class="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-purple-600 transition-colors playlist-play-btn" data-song-id="${song.id}">
                            <i class="fas fa-play text-xs"></i>
                        </button>
                    </div>
                </div>
            `;
            
            // Add click handler to the entire card
            mobileCard.addEventListener('click', function(e) {
                // Don't trigger if clicking on the play button itself
                if (!e.target.closest('.playlist-play-btn')) {
                    playTrackById(song.id);
                }
            });
            
            mobileContainer.appendChild(mobileCard);
            
            // Desktop row
            const desktopRow = document.createElement('tr');
            desktopRow.className = 'border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors duration-200 cursor-pointer';
            desktopRow.innerHTML = `
                <td class="py-4 px-4">
                    <button class="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-purple-600 transition-colors playlist-play-btn" data-song-id="${song.id}">
                        <i class="fas fa-play text-sm"></i>
                    </button>
                </td>
                <td class="py-4 px-4">
                    <div class="flex items-center">
                        <div class="w-10 h-10 rounded-lg overflow-hidden mr-3">
                            <img src="${song.cover}" alt="${song.title}" class="w-full h-full object-cover">
                        </div>
                        <h3 class="font-medium text-sm">${song.title}</h3>
                    </div>
                </td>
                <td class="py-4 px-4 text-sm">${song.artist}</td>
                <td class="py-4 px-4 text-sm hidden lg:table-cell">${song.album}</td>
                <td class="py-4 px-4 text-sm text-gray-400">${song.duration}</td>
                <td class="py-4 px-4">
                    <button class="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-red-600 transition-colors">
                        <i class="fas fa-heart text-sm"></i>
                    </button>
                </td>
            `;
            
            // Add click handler to the entire row
            desktopRow.addEventListener('click', function(e) {
                // Don't trigger if clicking on buttons
                if (!e.target.closest('button')) {
                    playTrackById(song.id);
                }
            });
            
            desktopContainer.appendChild(desktopRow);
        });
        
        // Add click handlers to all play buttons
        document.querySelectorAll('.playlist-play-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const songId = parseInt(this.getAttribute('data-song-id'));
                playTrackById(songId);
            });
        });
    }
    
    // Play a track by its ID
    function playTrackById(trackId) {
        if (!audioPlayer) return;
        
        const trackIndex = musicLibrary.findIndex(track => track.id === trackId);
        
        if (trackIndex !== -1) {
            currentTrackIndex = trackIndex;
            loadTrack(currentTrackIndex);
            
            // Start playing
            audioPlayer.play();
            isPlaying = true;
            updatePlayPauseButtons();
        }
    }
    
    // Make playTrackById available globally
    window.playTrackById = playTrackById;
    
    // Add touch-friendly interactions for mobile
    if ('ontouchstart' in window) {
        // Add active states for touch devices
        document.querySelectorAll('button, .nav-item, .playlist-item, .playlist-card').forEach(el => {
            el.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            el.addEventListener('touchend', function() {
                this.classList.remove('touch-active');
            });
            el.addEventListener('touchcancel', function() {
                this.classList.remove('touch-active');
            });
        });
    }
});

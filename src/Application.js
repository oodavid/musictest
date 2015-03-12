import AudioManager;
import device;
import ui.TextView as TextView;
GLOBAL.textSize   = Math.round(device.height/34);
GLOBAL.gridHeight = Math.round(device.height/18);

exports = Class(GC.Application, function () {

  this.initUI = function () {
    // Create the audio
    this.audio = new AudioManager({
      path: 'resources/sounds',
      files: {
        loop1: { path: 'music', background: true,  volume: 1, loop: true  },
        loop2: { path: 'music', background: true,  volume: 1, loop: true  },
        sfx1:  { path: 'sfx',   background: false, volume: 1, loop: false }
      }
    });
    // Title
    new TextView({
      superview: this,
      text:      'GameClosure AudioManager',
      color:     'white',
      x:         0,
      y:         0,
      width:     device.width,
      height:    gridHeight,
      size:      textSize
    });
    // Messages
    var message = new TextView({
      superview:       this,
      text:            'click buttons to begin...',
      backgroundColor: 'white',
      color:           'black',
      x:               0,
      y:               gridHeight,
      width:           device.width,
      height:          (gridHeight*2),
      size:            textSize,
      autoFontSize:    true,
      wrap:            true,
      autoSize:        false
    });
    // Used to track which background loop is currently playing
    var loop = false;
    // Logic!
    var logic = {
      "Play BG Loop 1": function(){
        message.setText('Playing BG Loop 1\nOnly one BG sound can play at a time');
        GC.app.audio.play('loop1');
        loop = 'loop1';
      },
      "Play BG Loop 2": function(){
        message.setText('Playing BG Loop 2\nOnly one BG sound can play at a time');
        GC.app.audio.play('loop2');
        loop = 'loop2';
      },
      "Play SFX 1": function(){
        message.setText('Playing non-background sound "sfx1"\nYou can play multiple sound at once');
        GC.app.audio.play('sfx1');
      },
      "Play SFX 2": function(){
        message.setText('Playing non-background sound "sfx2"\nNot loaded by default, do that below');
        GC.app.audio.play('sfx2');
      },
      " ": function(){ /* I want a spacer here! */},
      "Add SFX 2": function(){
        message.setText('Loading Sound "sfx2",\nit can now be played!');
        GC.app.audio.addSound('sfx2', { path: 'sfx', background: false, volume: 1, loop: false });
      },
      "Pause BG Loop": function(){
        message.setText('Pausing BG '+loop+', playing the loop again will continue from same spot');
        GC.app.audio.pause(loop);
      },
      "Stop BG Loop": function(){
        message.setText('Stopping BG '+loop+', playing the loop again will start from the beginning');
        GC.app.audio.stop(loop);
      },
      "Is BG Paused?": function(){
        var paused = GC.app.audio.isPaused(loop);
        message.setText('BG '+loop+(paused?' IS paused':' is NOT paused'));
      },
      "Is BG Playing?": function(){
        var playing = GC.app.audio.isPlaying(loop);
        message.setText('BG '+loop+(playing?' IS playing':' is NOT playing'));
      },
      "Set BG Volume": function(){
        var volume = Math.random().toFixed(2)
        message.setText('Setting volume for BG '+loop+' to '+volume);
        GC.app.audio.setVolume(loop, volume);
      },
      "Get BG Volume": function(){
        var volume = GC.app.audio.getVolume(loop);
        message.setText('Reading volume for BG '+loop+' as '+volume);
      },
      "Mute Everything": function(){
        message.setText('Muting all sounds\ntry playing Music or SFX');
        GC.app.audio.setMuted(true);
      },
      "Unmute Everything": function(){
        message.setText('Unmuting all sounds\ntry playing Music or SFX');
        GC.app.audio.setMuted(false);
      },
      "Mute The Music": function(){
        message.setText('Muting the Music\ntry playing Music');
        GC.app.audio.setMusicMuted(true);
      },
      "Unmute The Music": function(){
        message.setText('Unmuting the Music\ntry playing Music');
        GC.app.audio.setMusicMuted(false);
      },
      "Mute SFX": function(){
        message.setText('Muting the SFX\ntry playing SFX');
        GC.app.audio.setEffectsMuted(true);
      },
      "Unmute SFX": function(){
        message.setText('Unmuting the SFX\ntry playing SFX');
        GC.app.audio.setEffectsMuted(false);
      },
      "Is Everything Mute?": function(){
        var mute = GC.app.audio.getMuted();
        message.setText('Everything '+(mute?'IS Mute':'is NOT Mute'));
      },
      "Is The Music Mute?": function(){
        var mute = GC.app.audio.getMusicMuted();
        message.setText('The Music '+(mute?'IS Mute':'is NOT Mute'));
      },
      "Is The SFX Mute?": function(){
        var mute = GC.app.audio.getEffectsMuted();
        message.setText('The SFX '+(mute?'IS Mute':'is NOT Mute'));
      },
      "  ": function(){ /* I need another spacer! */},
      "Set BG Time": function(){
        message.setText('Jumping to time\n(right before a pitch change)');
        GC.app.audio.setTime(loop, 1.5);
      },
      "Get BG Time": function(){
        var time = GC.app.audio.getTime(loop);
        message.setText('BG '+loop+' is at '+time+'ms');
      },
      "Get BG Duration": function(){
        var duration = GC.app.audio.getDuration(loop);
        message.setText('BG '+loop+' is '+duration+'ms long');
      },
      "Get File Extension": function(){
        var ext = GC.app.audio.getExt('loop1');
        message.setText('The extension for loop 1 is '+ext);
      },
      "Get Paths": function(){
        var path1 = GC.app.audio.getPath();
        var path2 = GC.app.audio.getPath('sfx1');
        message.setText('Path to audio: '+path1+'\nPath to sfx1: '+path2);
      },
      "Change Audio Path": function(){
        message.setText('Setting audio path to alternative directory "resources/sounds-alt" - different SFX! (but identical Music files, sorry)');
        GC.app.audio.setPath('resources/sounds-alt');
      }
    };
    // Loop the logic and create buttons
    var x   = 0;
    var y   = (gridHeight*3);
    for(var l in logic){
      // The view
      var view = new TextView({
        superview: this,
        text:      l,
        color:     'white',
        x:         x,
        y:         y,
        width:     (device.width/2),
        height:    gridHeight,
        size:      textSize
      });
      // The callback
      view.on('InputStart', bind(this, logic[l]));
      // Be a grid
      if(x > 0){
        x = 0;
        y += gridHeight;
      } else {
        x += (device.width/2);  
      }
    }
  };

  this.launchUI = function () {};
});

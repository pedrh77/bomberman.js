kaboom({
    global: true,
    fullscreen: true,
    scale: 2,
    debug: true,
    clearColor: [0, 0, 0, 1]
});

scene('start', () => {
    add([
        text('Bomberman', 32),
        origin('center'),
        pos(width() / 2, height() / 2 - 50)
    ]);

    add([
        text('Press S for Solo, M for Multiplayer', 16),
        origin('center'),
        pos(width() / 2, height() / 2)
    ]);

    keyPress('s', () => {
        go('solo', { level: 0, score: 0 });
    });

    keyPress('m', () => {
        go('multiplayer', { level: 0, score: 0 });
    });

    add([
        text('Created by:', 12
        ),
        origin('center'),
        pos(width() / 2, height() / 2+50)
    ]);
    add([
        text('Fernando Dolce, Pedro Santos e Pedro Barraki', 12
        ),
        origin('center'),
        pos(width() / 2, height() / 2+70)
    ]);
});

go('start');

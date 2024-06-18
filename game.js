const MOVE_SPEED = 120;
const ENEMY_SPEED = 60;


loadSprite('wall-steel', 'sprites/block.png');
loadSprite('brick-red', 'sprites/block-destroy.png');
loadSprite('door', 'sprites/door.png');
loadSprite('kaboom', 'sprites/explosion.png');
loadSprite('bg', 'sprites/bg.png');
loadSprite('wall-gold', 'sprites/gold-wall.png');
loadSprite('brick-wood', 'sprites/orange-wall.png');

loadSprite('bomberman1', 'sprites/player1.png', {
    sliceX: 7,
    sliceY: 4,
    anims: {

        idleLeft: { from: 21, to: 21 },
        idleRight: { from: 7, to: 7 },
        idleUp: { from: 0, to: 0 },
        idleDown: { from: 14, to: 14 },

        moveLeft: { from: 22, to: 27 },
        moveRigth: { from: 8, to: 13 },
        moveUp: { from: 1, to: 6 },
        moveDown: { from: 15, to: 20 },
    }
});
loadSprite('boomber', 'sprites/bomb.png', {
    sliceX: 3,

    anims: {
        move: { from: 0, to: 2 },
    }
});

loadSprite('baloon', 'sprites/mushroom.png', { sliceX: 3 });
loadSprite('ghost', 'sprites/green-bug.png', { sliceX: 3 });
loadSprite('slime', 'sprites/blue-bug.png', { sliceX: 3 });

loadSprite('explosion', 'sprites/explosion.png', {
    sliceX: 5,
    sliceY: 5,
});

scene('game', ({ level, score }) => {
    layers(['bg', 'obj', 'ui'], 'obj');

    const maps = [
        [
            'aaaaaaaaaaaaaaa',
            'azzzz  *zzzzzda',
            'azazazazazazaza',
            'azzzzzzzzzzzzza',
            'azazazazazaza a',
            'azzzz* zzzzzz}a',
            'azazazazazaza a',
            'a zzzzzzzzzzz a',
            'a azazazazazaza',
            'a  zzzazzzzzzza',
            'a azazazazazaza',
            'azzzzzzzzzzzzza',
            'azazazazazazada',
            'azzzzz   &   za',
            'aaaaaaaaaaaaaaa',
        ],
        [
            'aaaaaaaaaaaaaaa',
            'bwwww  *wwwwwwb',
            'bwbwbwbwbwbwbpb',
            'b      *      b',
            'bwbwbwbwbwbb b',
            'bwwww* wwwwwwwb',
            'bwbwbwbwb bwb b',
            'b  wwpwww}www b',
            'b bwbwbwb bwbwb',
            'b  wwwwwwwwwwwb',
            'b bwbwbwbwbwbwb',
            'bwww  &   wwpwb',
            'bwbwbwbwbwbwbwb',
            'bwwwww   &   wb',
            'aaaaaaaaaaaaaaa',
        ],
        [
            'aaaaaaaaaaaaaaa',
            'a****cc**cc**ta',
            'a cccccccccccca',
            'a *c*c*c*c*c*ca',
            'a**c**c**c**c*a',
            'a**c**c**c**c*a',
            'a c*c*c*c*c*c*a',
            'a ccccccccccc*a',
            'a c*c*c*c*c*c*a',
            'a**c**c**c**c*a',
            'a**c**c**c**c*a',
            'a*c*c*c*c*c*c*a',
            'accccccccccccca',
            'a****cc**cc***a',
            'aaaaaaaaaaaaaaa',
        ]
    ];

    const levelCfg = {
        width: 26,
        height: 26,
        a: [sprite('wall-steel'), 'wall-steel', solid(), 'wall'],
        z: [sprite('brick-red'), 'wall-brick', solid(), 'wall'],
        d: [sprite('brick-red'), 'wall-brick-dool', solid(), 'wall'],
        b: [sprite('wall-gold'), 'wall-gold', solid(), 'wall'],
        w: [sprite('brick-wood'), 'wall-brick', solid(), 'wall'],
        p: [sprite('brick-wood'), 'wall-brick-dool', solid(), 'wall'],
        t: [sprite('door'), 'door'],
        '}': [sprite('ghost'), 'dangerous', 'ghost', { dir: -1, timer: 0 }],
        '&': [sprite('slime'), 'slime', { dir: -1 }, 'dangerous', { timer: 0 }],
        '*': [sprite('baloon'), 'baloon', { dir: -1 }, 'dangerous', { timer: 0 }],
    };

    const gameLevel = addLevel(maps[level], levelCfg);

    add([sprite('bg'), layer('bg')]);

    const scoreLabel = add([
        text('Score: ' + score),
        pos(400, 30),
        layer('ui'),
        {
            value: score,
        },
        scale(1)
    ]);

    add([text('Level: ' + parseInt(level + 1)), pos(400, 60), scale(1)]);

    const player = add([
        sprite('bomberman1', {
            animSpeed: 0.1,
            frame: 14,
        }),
        pos(30, 170),
        { dir: vec2(1, 0) },
        'player'
    ]);

    player.action(() => {
        player.pushOutAll()
    })

    keyDown('left', () => {
        player.move(-MOVE_SPEED, 0);
        player.dir = vec2(-1, 0);
    })

    keyDown('right', () => {
        player.move(MOVE_SPEED, 0);
        player.dir = vec2(1, 0);
    })

    keyDown('up', () => {
        player.move(0, -MOVE_SPEED);
        player.dir = vec2(0, -1);
    })

    keyDown('down', () => {
        player.move(0, MOVE_SPEED);
        player.dir = vec2(0, 1);
    })

    keyPress('left', () => {
        player.play('moveLeft')
    })

    keyPress('right', () => {
        player.play('moveRigth')
    })

    keyPress('up', () => {
        player.play('moveUp')
    })

    keyPress('down', () => {
        player.play('moveDown')
    })

    keyRelease('left', () => {
        player.play('idleLeft')
    })

    keyRelease('right', () => {
        player.play('idleRight')
    })

    keyRelease('up', () => {
        player.play('idleUp')
    })

    keyRelease('down', () => {
        player.play('idleDown')
    })

    keyPress('space', () => {
        spawnBomber(player.pos.add(player.dir.scale(0)))
    })


    action('baloon', (s) => {
        s.pushOutAll();
        s.move(s.dir * ENEMY_SPEED, 0);
        s.timer -= dt();
        if (s.timer <= 0) {
            s.dir = -s.dir;
            s.timer = rand(5);
        }
    });

    action('slime', (s) => {
        s.pushOutAll();
        s.move(s.dir * ENEMY_SPEED, 0);
        s.timer -= dt();
        if (s.timer <= 0) {
            s.dir = -s.dir;
            s.timer = rand(5);
        }
    });

    action('ghost', (s) => {
        s.pushOutAll();
        s.move(0, s.dir * ENEMY_SPEED);
        s.timer -= dt();
        if (s.timer <= 0) {
            s.dir = -s.dir;
            s.timer = rand(5);
        }
    });

    function incrementScore(points) {
        scoreLabel.value += points;
        scoreLabel.text = 'Score: ' + scoreLabel.value;
    }

    function spawnKaboom(p, frame) {
        const obj = add([
            sprite('explosion', {
                animeSpeed: 0.1,
                frame: frame,
            }),
            pos(p),
            scale(1.5),
            'kaboom'
        ])

        obj.pushOutAll();
        wait(0.5, () => {
            destroy(obj);
        })
    }

    function spawnBomber(p) {
        const obj = add([sprite('boomber'), ('move'), pos(p), scale(1.2), 'bomber']);


        obj.pushOutAll();
        obj.play("move");

        wait(4, () => {
            destroy(obj);

            obj.dir = vec2(1, 0)
            spawnKaboom(obj.pos.add(obj.dir.scale(0)), 12)

            obj.dir = vec2(0, -1)
            spawnKaboom(obj.pos.add(obj.dir.scale(20)), 2)


            obj.dir = vec2(0, 1)
            spawnKaboom(obj.pos.add(obj.dir.scale(20)), 22)


            obj.dir = vec2(-1, 0)
            spawnKaboom(obj.pos.add(obj.dir.scale(20)), 10)

            obj.dir = vec2(1, 0)
            spawnKaboom(obj.pos.add(obj.dir.scale(20)), 14)

        })
    }


    player.collides('door', (d) => {
        go("game", {
            level: (level + 1) % maps.length,
            score: scoreLabel.value
        });
    });

    collides('kaboom', 'wall-brick', (k, s) => {
        camShake(4);
        wait(1, () => {
            destroy(k);
        });
        destroy(s);
    });

    collides('baloon', 'wall', (s) => {
        s.dir = -s.dir;
    });

    collides('slime', 'wall', (s) => {
        s.dir = -s.dir;
    });

    collides('ghost', 'wall', (s) => {
        s.dir = -s.dir;
    });
    collides('kaboom', 'wall-brick-dool', (k, s) => {
        camShake(4);
        wait(1, () => {
            destroy(k);
        });
        destroy(s);
        gameLevel.spawn('t', s.gridPos.sub(0, 0));
    });

    collides('kaboom', 'player', (k, p) => {
        camShake(4);
        wait(1, () => {
            player.destroy();
            go('lose', { score: scoreLabel.value });
        });
    });

    player.collides('dangerous', () => {
        destroy(player);
        go('lose', { score: scoreLabel.value });
    });
    collides('baloon', 'kaboom', (s) => {
        incrementScore(100);
        destroy(s);
    });

    collides('slime', 'kaboom', (s) => {
        incrementScore(100);
        destroy(s);
    });
    collides('ghost', 'kaboom', (s) => {
        incrementScore(100);
        destroy(s);
    });
});

scene('lose', ({ score }) => {
    add([
        text('Score: ' + score, 32),
        origin('center'),
        pos(width() / 2, height() / 2)
    ]);
    add([
        text('Press Enter to Restart or F to Go Back', 12),
        origin('center'),
        pos(width() / 2, height() / 2 + 30)
    ]);


    keyPress('enter', () => {
        go('game', { level: 0, score: 0 });
    });

    keyPress('f', () => {
        go('start', { level: 0, score: 0 });
    });
});

start('game', { level: 0, score: 0 });
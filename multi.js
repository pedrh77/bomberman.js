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
        moveRight: { from: 8, to: 13 },
        moveUp: { from: 1, to: 6 },
        moveDown: { from: 15, to: 20 },
    }
});

loadSprite('bomberman2', 'sprites/player2.png', {
    sliceX: 7,
    sliceY: 4,
    anims: {
        idleLeft: { from: 21, to: 21 },
        idleRight: { from: 7, to: 7 },
        idleUp: { from: 0, to: 0 },
        idleDown: { from: 14, to: 14 },

        moveLeft: { from: 22, to: 27 },
        moveRight: { from: 8, to: 13 }, // Corrigido: estava 'moveRigth'
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

scene('multi', ({ level, score }) => {
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
            'a  zzzdzzzzzzza',
            'a azazazazazaza',
            'azzzzzzzzzzzzza',
            'azazazazazazaza',
            'azzzzz   &   za',
            'aaaaaaaaaaaaaaa',
        ],
        [
            'bbbbbbbbbbbbbbb',
            'bwwww  *wwwwwpb',
            'bwbwbwbwbwbwbwb',
            'b      *      b',
            'bwbwbwbwbwbwb b',
            'bwwww* wwwwwwwb',
            'bwbwbwbwb bwb b',
            'b wwwpwww}www b',
            'b bwbwbwb bwbwb',
            'b  wwwwwwwwwwwb',
            'b bwbwbwbwbwbwb',
            'bwww  &   wwwwb',
            'bwbwbwbwbwbwbwb',
            'bwwwww   &   wb',
            'bbbbbbbbbbbbbbb',
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
        t: [sprite('door'), 'door', 'wall'],
        '}': [sprite('ghost'), 'dangerous', 'ghost', { dir: -1, timer: 0 }],
        '&': [sprite('slime'), 'slime', { dir: -1, timer: 0 }, 'dangerous'],
        '*': [sprite('baloon'), 'baloon', { dir: -1, timer: 0 }, 'dangerous'],
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

    add([text('Level: ' + (level + 1)), pos(400, 60), scale(1)]);

    const player1 = add([
        sprite('bomberman1', {
            animeSpeed: 0.1,
            frame: 14,
        }),
        pos(20, 190),
        { dir: vec2(1, 0) },
        'player1'
    ]);

    const player2 = add([
        sprite('bomberman2', {
            animeSpeed: 0.1,
            frame: 14,
        }),
        pos(40, 190),
        { dir: vec2(1, 0) },
        'player2'
    ]);

    function playerActions(player, controls) {
        player.action(() => {
            player.pushOutAll();
        });

        keyDown(controls.left, () => {
            player.move(-MOVE_SPEED, 0);
            player.dir = vec2(-1, 0);
        });

        keyDown(controls.right, () => {
            player.move(MOVE_SPEED, 0);
            player.dir = vec2(1, 0);
        });

        keyDown(controls.up, () => {
            player.move(0, -MOVE_SPEED);
            player.dir = vec2(0, -1);
        });

        keyDown(controls.down, () => {
            player.move(0, MOVE_SPEED);
            player.dir = vec2(0, 1);
        });

        keyPress(controls.left, () => {
            player.play('moveLeft');
        });

        keyPress(controls.right, () => {
            player.play('moveRight');
        });

        keyPress(controls.up, () => {
            player.play('moveUp');
        });

        keyPress(controls.down, () => {
            player.play('moveDown');
        });

        keyRelease(controls.left, () => {
            player.play('idleLeft');
        });

        keyRelease(controls.right, () => {
            player.play('idleRight');
        });

        keyRelease(controls.up, () => {
            player.play('idleUp');
        });

        keyRelease(controls.down, () => {
            player.play('idleDown');
        });

        keyPress(controls.bomb, () => {
            spawnBomber(player.pos.add(player.dir.scale(0)));
        });
    }

    const controls1 = {
        left: 'left',
        right: 'right',
        up: 'up',
        down: 'down',
        bomb: 'enter'
    };

    const controls2 = {
        left: 'a',
        right: 'd',
        up: 'w',
        down: 's',
        bomb: 'space'
    };

    playerActions(player1, controls1);
    playerActions(player2, controls2);

    action('baloon', (s) => {
        s.pushOutAll();
        s.move(s.dir.scale(ENEMY_SPEED), 0);
        s.timer -= dt();
        if (s.timer <= 0) {
            s.dir = -s.dir;
            s.timer = rand(5);
        }
    });

    action('slime', (s) => {
        s.pushOutAll();
        s.move(s.dir.scale(ENEMY_SPEED), 0);
        s.timer -= dt();
        if (s.timer <= 0) {
            s.dir = -s.dir;
            s.timer = rand(5);
        }
    });

    action('ghost', (s) => {
        s.pushOutAll();
        s.move(0, s.dir.scale(ENEMY_SPEED));
        s.timer -= dt();
        if (s.timer <= 0) {
            s.dir = -s.dir;
            s.timer = rand(5);
        }
    });

    function spawnKaboom(p, frame) {
        const obj = add([
            sprite('explosion', {
                animSpeed: 0.1,
                frame: frame,
            }),
            pos(p),
            scale(1.5),
            'dangerous',
            'kaboom'
        ]);

        obj.pushOutAll();
        wait(0.5, () => {
            destroy(obj);
        });
    }

    function spawnBomber(p) {
        const obj = add([
            sprite('boomber'),
            'move',
            pos(p),
            scale(1.5),
            'bomber'
        ]);

        obj.pushOutAll();
        obj.play("move");

        wait(4, () => {
            destroy(obj);

            spawnKaboom(obj.pos.add(vec2(0, 0)), 12);
            spawnKaboom(obj.pos.add(vec2(0, -20)), 2);
            spawnKaboom(obj.pos.add(vec2(0, 20)), 22);
            spawnKaboom(obj.pos.add(vec2(-20, 0)), 10);
            spawnKaboom(obj.pos.add(vec2(20, 0)), 14);
        });
    }

    player1.collides('door', (d) => {
        go("multi", {
            level: (level + 1) % maps.length,
            score: scoreLabel.value
        });
    });

    player2.collides('door', (d) => {
        go("multi", {
            level: (level + 1) % maps.length,
            score: scoreLabel.value
        });
    });

    collides('kaboom', 'dangerous', (k, s) => {
        camShake(4);
        wait(1, () => {
            destroy(k);
        });
        destroy(s);
        scoreLabel.value++;
        scoreLabel.text = 'Score: ' + scoreLabel.value;
    });

    collides('kaboom', 'wall-brick', (k, s) => {
        camShake(4);
        wait(1, () => {
            destroy(k);
        });
        destroy(s);
    });

    collides('baloon', 'wall', (s) => {
        s.dir = s.dir.neg();
    });

    collides('slime', 'wall', (s) => {
        s.dir = s.dir.neg();
    });

    collides('ghost', 'wall', (s) => {
        s.dir = s.dir.neg();
    });

    collides('kaboom', 'wall-brick-dool', (k, s) => {
        camShake(4);
        wait(1, () => {
            destroy(k);
        });
        destroy(s);
        gameLevel.spawn('t', s.gridPos.sub(0, 0));
    });

    player1.collides('dangerous', () => {
        go('lose', { score: scoreLabel.value });
    });

    player2.collides('dangerous', () => {
        go('lose', { score: scoreLabel.value });
    });
});

scene('lose', ({ score }) => {
    add([
        text('Score: ' + score, 32),
        origin('center'),
        pos(width() / 2, height() / 2)
    ]);

    keyPress('space', () => {
        go('multi', { level: 0, score: 0 });
    });
});

start('multi', { level: 0, score: 0 });
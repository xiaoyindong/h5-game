import { random } from '../Utils';
export const NoHarm = [
    { // 向右走
        action: 'walk-right',
        left: 1,
        top: 1,
        time: random(3000, 13000),
        skill: 0,
        hurt: 0
    },
    { // 向右走
        action: 'walk-right',
        left: 1,
        top: -1,
        time: random(3000, 13000),
        skill: 0,
        hurt: 0
    },
    {
        action: 'walk-right',
        left: 0,
        top: 1,
        time: random(3000, 13000),
        skill: 0,
        hurt: 0
    },
    {
        action: 'walk-right',
        left: 0,
        top: -1,
        time: random(3000, 13000),
        skill: 0,
        hurt: 0
    },
    {
        action: 'walk-right',
        left: 1,
        top: 0,
        time: random(3000, 13000),
        skill: 0,
        hurt: 0
    },// 向左走
    {
        action: 'walk-left',
        left: -1,
        top: -1,
        time: random(3000, 13000),
        skill: 0,
        hurt: 0
    },
    {
        action: 'walk-left',
        left: -1,
        top: 1,
        time: random(3000, 13000),
        skill: 0,
        hurt: 0
    },
    {
        action: 'walk-left',
        left: 0,
        top: -1,
        time: random(3000, 13000),
        skill: 0,
        hurt: 0
    },
    {
        action: 'walk-left',
        left: 0,
        top: 1,
        time: random(3000, 13000),
        skill: 0,
        hurt: 0
    },
    {
        action: 'walk-left',
        left: -1,
        top: 0,
        time: random(3000, 13000),
        skill: 0,
        hurt: 0
    }, // 向右跑
    {
        action: 'run-right2',
        left: 2,
        top: 2,
        time: random(3000, 9500),
        skill: 0,
        hurt: 0
    },
    {
        action: 'run-right2',
        left: 2,
        top: -2,
        time: random(3000, 9500),
        skill: 0,
        hurt: 0
    },
    {
        action: 'run-right2',
        left: 2,
        top: 1,
        time: random(3000, 9500),
        skill: 0,
        hurt: 0
    },
    {
        action: 'run-right2',
        left: 2,
        top: -1,
        time: random(3000, 9500),
        skill: 0,
        hurt: 0
    },
    {
        action: 'run-right2',
        left: 2,
        top: 0,
        time: random(3000, 9500),
        skill: 0,
        hurt: 0
    },
    {
        action: 'run-right2',
        left: 1,
        top: 2,
        time: random(3000, 9500),
        skill: 0,
        hurt: 0
    },
    {
        action: 'run-right2',
        left: 1,
        top: -2,
        time: random(3000, 9500),
        skill: 0,
        hurt: 0
    },
    {
        action: 'run-right2',
        left: 0,
        top: 2,
        time: random(3000, 9500),
        skill: 0,
        hurt: 0
    },
    {
        action: 'run-right2',
        left: 0,
        top: -2,
        time: random(3000, 9500),
        skill: 0,
        hurt: 0
    }, // 向左跑
    {
        action: 'run-left2',
        left: -2,
        top: 2,
        time: random(3000, 9500),
        skill: 0,
        hurt: 0
    },
    {
        action: 'run-left2',
        left: -2,
        top: -2,
        time: random(3000, 9500),
        skill: 0,
        hurt: 0
    },
    {
        action: 'run-left2',
        left: -2,
        top: 1,
        time: random(3000, 9500),
        skill: 0,
        hurt: 0
    },
    {
        action: 'run-left2',
        left: -2,
        top: -1,
        time: random(3000, 9500),
        skill: 0,
        hurt: 0
    },
    {
        action: 'run-left2',
        left: -2,
        top: 0,
        time: random(3000, 9500),
        skill: 0,
        hurt: 0
    },
    {
        action: 'run-left2',
        left: -1,
        top: 2,
        time: random(3000, 9500),
        skill: 0,
        hurt: 0
    },
    {
        action: 'run-left2',
        left: -1,
        top: -2,
        time: random(3000, 9500),
        skill: 0,
        hurt: 0
    },
    {
        action: 'run-left2',
        left: 0,
        top: 2,
        time: random(3000, 9500),
        skill: 0,
        hurt: 0
    },
    {
        action: 'run-left2',
        left: 0,
        top: -2,
        time: random(3000, 10500),
        skill: 0,
        hurt: 0
    }, // 慢跑
    {
        action: 'run-left1',
        left: -1.5,
        top: -1.5,
        time: random(3000, 10500),
        skill: 0,
        hurt: 0
    },
    {
        action: 'run-left1',
        left: -1.5,
        top: 1.5,
        time: random(3000, 10500),
        skill: 0,
        hurt: 0
    },
    {
        action: 'run-left1',
        left: -1.5,
        top: -1,
        time: random(3000, 10500),
        skill: 0,
        hurt: 0
    },
    {
        action: 'run-left1',
        left: -1.5,
        top: 1,
        time: random(3000, 10500),
        skill: 0,
        hurt: 0
    },
    {
        action: 'run-left1',
        left: -1.5,
        top: 0,
        time: random(3000, 10500),
        skill: 0,
        hurt: 0
    },
    {
        action: 'run-right1',
        left: 1.5,
        top: -1.5,
        time: random(3000, 10500),
        skill: 0,
        hurt: 0
    },
    {
        action: 'run-right1',
        left: 1.5,
        top: 1.5,
        time: random(3000, 10500),
        skill: 0,
        hurt: 0
    },
    {
        action: 'run-right1',
        left: 0,
        top: -1.5,
        time: random(3000, 10500),
        skill: 0,
        hurt: 0
    },
    {
        action: 'run-right1',
        left: 0,
        top: 1.5,
        time: random(3000, 10500),
        skill: 0,
        hurt: 0
    },
    {
        action: 'run-right1',
        left: 1,
        top: -1.5,
        time: random(3000, 10500),
        skill: 0,
        hurt: 0
    }, // 向右站立
    {
        action: 'default-right',
        left: 0,
        top: 0,
        time: random(2500, 6500),
        skill: 0,
        hurt: 0
    }, // 向左站立
    {
        action: 'default-left',
        left: 0,
        top: 0,
        time: random(2500, 6500),
        skill: 0,
        hurt: 0
    }
];

export const UseSkill = [ // 使用技能
    { // 恢复
        action: 'fowradT-left',
        left: 0,
        top: 0,
        time: 2500,
        skill: 3,
        hurt: 0,
    },
    {
        action: 'fowradT-right',
        left: 0,
        top: 0,
        time: 2500,
        skill: 3,
        hurt: 0,
    }
]

export const SingleAttack = [
    { // 追踪
        action: 'anqi-left',
        left: 0,
        top: 0,
        time: 2500,
        skill: 1,
        hurt: 1,
        track: true
    },
    {
        action: 'anqi-right',
        left: 0,
        top: 0,
        time: 2500,
        skill: 1,
        hurt: 1,
        track: true
    }, // 劈
    {
        action: 'fowradR-left',
        left: 0,
        top: 0,
        time: 2500,
        skill: 1,
        hurt: 2.3,
        track: false
    },
    {
        action: 'fowradR-right',
        left: 0,
        top: 0,
        time: 2500,
        skill: 1,
        hurt: 2.3,
        track: false
    }, // 上挑
    {
        action: 'fowradT-left',
        left: 0,
        top: 0,
        time: 2000,
        skill: 1,
        hurt: 1.8,
        track: false
    },
    {
        action: 'fowradT-right',
        left: 0,
        top: 0,
        time: 2000,
        skill: 1,
        hurt: 1.8,
        track: false
    }, // 连招
    {
        action: 'lianzhao-left',
        left: 0,
        top: 0,
        time: 2400,
        skill: 1,
        track: false,
        hurt: 3.5
    },
    {
        action: 'lianzhao-left',
        left: 0,
        top: 0,
        time: 2400,
        skill: 1,
        track: false,
        hurt: 3.5
    }, // 击飞
    {
        action: 'jifei-left',
        left: 0,
        top: 0,
        time: 1800,
        skill: 1,
        track: false,
        hurt: 1
    },
    {
        action: 'jifei-right',
        left: 0,
        top: 0,
        time: 1800,
        skill: 1,
        track: false,
        hurt: 1
    }, // 前刺
    {
        action: 'qianci-left',
        left: 0,
        top: 0,
        time: 1800,
        skill: 1,
        track: false,
        hurt: 1.2
    },
    {
        action: 'qianci-right',
        left: 0,
        top: 0,
        time: 1800,
        skill: 1,
        track: false,
        hurt: 1.2
    }, // 重劈
    {
        action: 'zhongpi-left',
        left: 0,
        top: 0,
        time: 1800,
        skill: 1,
        track: false,
        hurt: 2.8
    },
    {
        action: 'zhongpi-left',
        left: 0,
        top: 0,
        time: 1800,
        skill: 1,
        track: false,
        hurt: 2.8
    }
]

export const GroupAttack = [
    { // 群体攻击
        action: 'fowradT-left',
        left: 0,
        top: 0,
        time: 2500,
        skill: 2,
        hurt: 2.5,
        range: 'all'
    },
    {
        action: 'fowradT-right',
        left: 0,
        top: 0,
        time: 2500,
        skill: 2,
        hurt: 2.5,
        range: 'all'
    }, // 斩
    {
        action: 'fowradL-left',
        left: 0,
        top: 0,
        time: 2500,
        skill: 2,
        hurt: 2,
        range: 3
    },
    {
        action: 'fowradL-right',
        left: 0,
        top: 0,
        time: 2500,
        skill: 2,
        hurt: 2,
        range: 3
    }
]
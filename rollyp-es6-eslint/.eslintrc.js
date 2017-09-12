// http://eslint.org/docs/user-guide/configuring

module.exports = {
    'root': true,    
    'extends': "airbnb",
    "parser": "babel-eslint",
    'parserOptions': {
        // ECMAScript 版本
        "ecmaVersion": 6,
        'sourceType': 'module',
        'ecmaFeatures': {
            // 允许在全局作用域下使用 return 语句
            "globalReturn": true,
            "jsx": false
        }
    },
    'env': {
        'browser': true,
        'es6': true,
        'mocha': true,
        "node": true
    },
    'globals': {
        'Babel': true
    },
    // add your custom rules here
    'rules': {
        // 关闭react拓展
        'jsx-a11y/href-no-hash': 0,
        'react/require-extension': 0,       
        // 必须句尾使用分号
        'semi': 2,
        // 文件末尾强制换行，目前暂时放弃，考虑到一些Idle的格式化问题
        'eol-last': 0,
        // 禁用 console，目前console变为警告级别
        'no-console': 0,
        //强制使用一致的缩进，4个空格
        'indent': [2, 4, {
            'SwitchCase': 1
        }],
        //  禁用行尾空格,允许空行使用空白符
        'no-trailing-spaces': [2, {
            'skipBlankLines': true
        }],
        // 要求构造函数首字母大写  （要求调用 new 操作符时有首字母大小的函数，允许调用首字母大写的函数时没有 new 操作符。）
        // 允许  new a.B()形式
        'new-cap': [2, {
            'newIsCap': true,
            'capIsNew': false,
            'properties': false
        }],
        // 函数的()前可以没有空格
        'space-before-function-paren': [0, 'always'],
        // allow paren-less arrow functions
        // 箭头函数必须使用圆括号，如 (a) => {}
        'arrow-parens': 2,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
}
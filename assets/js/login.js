$(function () {
    // 点击事件
    $('#link_login').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#link_reg').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })
    // 表格输入格式
    let form = layui.form
    let layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,而且不能出现空格'],

        repwd: function (value) {
            let pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }

        }
    })
    // 声明项目的请求根路径
    const baseUrl='http://www.liulongbin.top:3007'
    // 注册的提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: `${baseUrl}/api/reguser`,
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success(res) {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg('注册成功，请登录！');
                $('#link_reg').click()
            }
        })
    })

    // 登录的提交事件
    $('#login-box').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'post',
            url:`${baseUrl}/api/login`,
            // 快速获取表单数据
            data:$(this).serialize(),
            success(res){
                if(res.status!==0) return layer.msg('登陆失败！')
                layer.msg('登录成功')
                console.log(res.token);
                // 将获取的token数据保存到本地存储中去
                localStorage.setItem('token',res.token)
                // 跳转到后台主页
                location.href='/index.html'
            }
        })
    })

})
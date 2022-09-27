$(function () {
    // 调用getUserInfo获取用户基本信息
    getUserInfo()
})
const baseUrl = 'http://www.liulongbin.top:3007'
// 获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: `${baseUrl}/my/userinfo`,
        headers: {
            Authorization: localStorage.getItem('token') || ''

        },
        success(res) {
            if (res.status !== 0) return layui.layer.msg('获取用户信息失败')
            //    调用renderAvadar函数，渲染用户头像
            renderAvadar(res.data)

        },
        complete(res){
            console.log(res);
            if(res.responseJSON.status===1 && res.responseJSON.message==='身份认证失败！'
                ){
                    localStorage.removeItem('token')
                    location.href='/login.html'

                }
            
        }


    })
    // let layer=layui.layer
    // 实现退出功能
    $('#btnLogout').on('click', function () {
        layer.confirm('确认退出?', { icon: 3, title: '提示' }, function (index) {
            // 删除本地存储中的token
            localStorage.removeItem('token')
            location.href='/login.html'
            //do something

            layer.close(index);
        });
        //eg2

    })

}
function renderAvadar(user) {
    let name = user.nickname || user.username
    $('#welcome').html(`欢迎  ${name}`)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()

    } else {
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()

    }

}
<script>
    let name;
    let power;
</script>
<div class="contenair">
    <div class="content">
        <div class="infocontent">
            <p class="username"><input placeholder="请输入用户名"/></p>
            <p class="possword"><input type="text" placeholder="请输入密码"></p>
            <p class="button">登录</p>
        </div>
    </div>
</div>
<style>
    :global(body,html) {
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
    }

    .contenair {
        height: 100%;
        width: 100%;
        position: relative;
        background: url("http://img4.imgtn.bdimg.com/it/u=2305459574,3110315328&fm=26&gp=0.jpg") no-repeat;
        background-size: 100% 100%;
    }

    .content {
        position: absolute;
        top: 40%;
        width: 70%;
        left: 15%;
    }
    .infocontent{
        width: 100%;
    }
    .possword input,.username input{
        width: 100%;
        background: none;
        border: none;
        border-bottom: 1px solid #fff;
        outline: none;
        padding-left: 10px;
        color:#fff;
    }
   .button{
        width: 100%;
        text-align: center;
        color:#fff;
        background: #42a1ff;
        border-radius: 5px;
        line-height: 35px;
    }
</style>
<template>
    <div class="btm">
        <div class="bottom-bar">
            <div class="container">
                <div class="row">
                    <div class="btm-links">
                        <div>
                            <a href="#" >Техническая поддержка</a>
                        </div>
                        <div>
                            <a href="https://pkvartal.mskobr.ru/" target="_blank" rel="noopener noreferrer">Официальный сайт</a>
                        </div>
                        <div>
                            <a href="https://vk.com/pkvartal_school" target="_blank" rel="noopener noreferrer">ВКонтакте</a>
                        </div>
                        <div>
                            <a href="https://www.youtube.com/channel/UCA3mk1zfrqIFkz3c0cuKF4A" target="_blank" rel="noopener noreferrer">YouTube</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
</script>

<style scoped>
.btm {
    
    position: fixed;
    bottom: 0;
    height: 100px;
    width: 100vw;
}
.bottom-bar {
    position: fixed;
    bottom: -50px;
    background-color: #D2DBE8;
    width: 100%;
    height: auto;
    transition: 0.5s;
}
.btm:hover .bottom-bar{
    bottom: 0;
}
.btm-links{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    min-height: 50px;
}
a {
    color: black;
}
</style>
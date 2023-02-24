<template>
    <div class="bottom-bar">
        <div class="container">
            <div class="row">
                <div class="btm-links">
                    <div>
                        <a href="#">Техническая поддержка</a>
                    </div>
                    <div>
                        <a href="#">Официальный сайт</a>
                    </div>
                    <div>
                        <a href="#">ВКонтакте</a>
                    </div>
                    <div>
                        <a href="#">YouTube</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
</script>

<style scoped>
.bottom-bar {
    position: fixed;
    bottom: 0;
    background-color: #D9D9D9;
    width: 100%;
    height: auto;
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
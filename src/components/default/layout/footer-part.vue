<template>
    <footer>
        <div class="container">
            <div class="row d-flex">
                <div class="col-12 col-md-3">
                    <div class="logo">Zoopay</div>
                    <div class="info">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint quaerat ab placeat
                        vitae tempora pariatur, minus soluta quos quas, iusto nobis enim iste commodi dolores, quasi dolorem
                        rem debitis? Laborum?</div>
                    <div class="social q-mb-md">
                        <a href="#" target="_blank">
                            <q-icon color="white" size="24px" class="q-mr-md" name="bi-facebook" />
                        </a>
                        <a href="#" target="_blank">
                            <q-icon color="white" size="24px" class="q-mr-md" name="bi-instagram" />
                        </a>
                        <a href="#" target="_blank">
                            <q-icon color="white" size="24px" name="bi-telegram" />
                        </a>
                    </div>
                    <div class="links">
                        <router-link to='/' class="category">Biz haqimizda</router-link>
                        <router-link to='/' class="subcategory">
                            Savol-javoblar
                        </router-link>
                        <router-link to='/' class="subcategory">
                            Yangiliklar
                        </router-link>
                        <router-link to='/' class="subcategory">
                            Aloqa
                        </router-link>
                    </div>
                </div>
                <div class="col-12 col-md-3" v-for="item of 3" :key="item">
                    <div class="row q-col-gutter-lg">
                        <div class="col-md-12 col-6">
                            <div class="links">
                                <router-link to='/' class="category">Ish</router-link>
                                <router-link to='/' class="subcategory">
                                    Bolallar dunyosi
                                </router-link>
                                <router-link to='/' class="subcategory">
                                    Bolallar dunyosi
                                </router-link>
                                <router-link to='/' class="subcategory">
                                    Bolallar dunyosi
                                </router-link>
                                <router-link to='/' class="subcategory">
                                    Bolallar dunyosi
                                </router-link>
                                <router-link to='/' class="subcategory">
                                    Bolallar dunyosi
                                </router-link>
                            </div>
                        </div>
                        <div class="col-md-12 col-6">
                            <div class="links">
                                <router-link to='/' class="category">Ish</router-link>
                                <router-link to='/' class="subcategory">
                                    Bolallar dunyosi
                                </router-link>
                                <router-link to='/' class="subcategory">
                                    Bolallar dunyosi
                                </router-link>
                                <router-link to='/' class="subcategory">
                                    Bolallar dunyosi
                                </router-link>
                                <router-link to='/' class="subcategory">
                                    Bolallar dunyosi
                                </router-link>
                                <router-link to='/' class="subcategory">
                                    Bolallar dunyosi
                                </router-link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>


</script>

<style lang="scss" scoped>@import '@/styles/components/default/footer.scss';</style>
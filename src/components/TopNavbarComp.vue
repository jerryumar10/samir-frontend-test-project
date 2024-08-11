<template>
    <nav class="navbar navbar-light navbar-expand-md fixed-top navbar-custom" style="background-color: #5F9EA0;">
        <div class="container container-custom">
            <a class="navbar-brand" href="/">
                <img src="../assets/logo_placeholder.png" alt="Logo" width="40" height="40">
            </a>
            <button class="navbar-toggler" type="button" @click="toggleNavbarDropdown" style="margin-right: 10px">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" :class="{show:isNavbarOpen}">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a class="btn" aria-current="page" href="/">Loan List</a>
                    </li>
                    <li class="nav-item">
                        <a class="btn" @click="goToBorrowerList">Borrower List</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>

export default{
    data(){
        return{
            isNavbarOpen: false,
        };
    },
    methods:{
        goToBorrowerList(){
            this.$router.replace({path:'/loan-user-list'});
        },
        toggleNavbarDropdown(){
            this.isNavbarOpen = !this.isNavbarOpen;
        },
    },
}
</script>

<style>
.navbar-custom{
    height: 60px;
    /*box-shadow:rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;*/
}

a.btn{
    font-size: 14px;
    text-align: center;
    border-radius: 0 !important;
    border-color: transparent !important;
    color: #191970 !important; /* Text color */
    font-weight: bold !important;
    padding: 10px 15px; /* Adjust padding as needed */
    transition: background-color 0.3s ease !important;
}
a.btn:hover{
    background-color: #5F9EA0;
    filter: brightness(90%);
}

.dropdown-text-custom{
    color: #000000 !important; /* Text color */
    font-weight: 500 !important;
}

.dropdown-menu{
    margin-top: 55px !important;
}

.dropdown-menu:hover{
    cursor: pointer;
    filter: brightness(90%);
}

.navbar-toggler-icon {
  color: #000000 !important;
}

@media(max-width: 767px){
    .navbar-collapse{
        background-color: #FFFFFF;
        width: 100%;
        margin-top: 5px;
    }
    .dropdown-menu-custom{
    position: absolute !important;
    }
    .dropdown-menu{
    margin-top: 48px !important;
    }
    .container-custom{
        margin-left: 10px;
    }
}
</style>
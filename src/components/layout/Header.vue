<template>
  <div class="header">
    <router-link class="header__link" :to="{name: 'home'}">
      <h1 class="header__title">Word Keeper</h1>
    </router-link>
    <router-link class="header__link" :to="{name: 'favorites'}">
      <h1 class="header__title"><span>&#9733;</span> Starred Words</h1>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style lang='scss'>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    background-color: rgb(134, 190, 252);
    border-radius: 8px;
    &__link {
      text-decoration: none;
      transition: 1s all;
      &:hover {
        text-decoration: none;
        color: white;
        transform: scale(1.05, 1.05);
        text-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        & span {
          color: yellow;
        }
      }
    }
    &__title {
      font-size: 30px;
      color: white;
    }
  }

  @media(max-width: 768px) {
    .header {
      &__title {
        font-size: 25px;
      }
    }
  }

  @media(max-width: 450px) {
    .header {
      padding: 2px;
      &__title {
        font-size: 19px;
      }
    }
  }

</style>

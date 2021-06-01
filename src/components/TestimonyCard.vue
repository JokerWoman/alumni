<template>
  <b-card
    align="center"
    :img-src="testimony.img"
    img-top
    :id="`cardTestimony${testimony.id}`"
    img-height="200px"
    style="width: 200px; margin-left:50px; margin-right:50px; background-color:#f3f3fb"
    img-alt="Imagem do testimunha"
  >
    <b-card-text style="color:#FFCA1C; margin-bottom: 5px; font-size: 20px "
      >{{ testimony.name }}
    </b-card-text>
    <b-card-text>{{ testimony.description }}</b-card-text>
  </b-card>
</template>

<style>
.b-card-image {
  object-fit: cover;
}
</style>

<script>
export default {
  name: "TestimonyCard",
  props: {
    testimony: Object
  }
};
</script>

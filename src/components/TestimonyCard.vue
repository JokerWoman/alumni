<template>
    <b-card
        :img-src="testimony.img"
        img-top
        tag="article"
        :id="`cardTestimony${testimony.id}`"
    >
    <b-card-img> {{ testimony.img }}</b-card-img>
    <b-card-title> {{ testimony.name }}</b-card-title>
    <b-card-text> {{ testimony.description }}</b-card-text>
  </b-card>
</template>

<script>

export default {
    name: "TestimonyCard",
    props:{
        testimony: Object,
    }
}

</script>
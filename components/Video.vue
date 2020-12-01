<template>
    <div
        class="video"
        :class="{ 'video--playing' : cursorText ==='Pause' }"
        @mousemove="moveImages"
        @mouseleave="hideImages"
        @mouseenter="moveImages($event)">
        <vue-plyr
            :options="videoOptions"
            ref="plyr"
            v-if="section.video_type === 'embed'">
            <div
                class="plyr__video-embed"
                v-html="section.video_url"
            ></div>
        </vue-plyr>
        <vue-plyr
            :options="videoOptions"
            ref="plyr"
            v-if="section.video_type === 'local'">
            <video
                playsinline
                :data-poster="section.video_placeholder.url">
                <source
                    v-if="section.video_src_mpeg4"
                    :src="section.video_src_mpeg4.url"
                    type="video/mp4"
                />
                <source
                    v-if="section.video_src_webm"
                    :src="section.video_src_webm.url"
                    type="video/webm"
                />
            </video>
        </vue-plyr>
        <div
            ref="cursor"
            class="video__cursor hidden xl:flex absolute z-50 pointer-events-none items-center overflow-hidden"
            :class="{ 'video__cursor--active' : displayCursor }">
            <img v-if="cursorText ==='Play'" src="../assets/img/Play.png" class="w-8 mr-2"> 
            <div>
                <span class="block font-serif uppercase text-2xl text-pink">Play</span>
                <span class="block font-serif uppercase text-2xl text-pink">Pause</span>
            </div>
        </div>
    </div>
</template>

<script>
import { TweenMax } from "gsap";

export default {
  name: "Video",

    props: {
      section: Object
    },

    data() {
        return {
            displayCursor: false,
            cursorText: "Play",
            videoOptions: {
                controls: []
            }
        }
    },

    mounted() {
        this.$refs.plyr.player.on('playing play', () => {
            this.cursorText = "Pause";
            console.log('event playing')
        })
        
        this.$refs.plyr.player.on('pause', () => {
            this.cursorText = "Play";
            console.log('event paused')
        })
    },

    methods: {
        hideImages() {
            setTimeout(() => {
                this.displayCursor = false;
            }, 200);
        },

        moveImages(e) {
            //const rect = this.$refs.images.getBoundingClientRect();

            // this.imagesOutRight = (rect.right > (window.innerWidth || document.documentElement.clientWidth));
            // this.imagesOutBottom = (rect.bottom > (window.innerHeight || document.documentElement.clientHeight));
            
            if (this.$refs.cursor) {
                this.displayCursor = true;

                TweenMax.to(this.$refs.cursor, 0.2, {
                css: {
                    left: e.pageX,
                    top: e.pageY - 40
                }
                });
            }
        },
    }
}
</script>

<style>
/* video */
.video {
    overflow: hidden;
}

.video .plyr__poster {
    background-size: cover;
}

.video:hover > * {
  cursor: none !important;
}

 .video__cursor {
    height: 50px;
    opacity: 0;
    visibility: hidden;
    transition: visibility .1s, opacity .1s;
}

.video__cursor > div {
    transition: transform .6s cubic-bezier(0.76, 0, 0.24, 1);
}

.video__cursor > div {
    transform: translateY(100%);
}

.video__cursor > div,
.video__cursor > div span {
    height: 100%;
    line-height: 1.25;
}

.video__cursor--active {
    opacity: 1;
    visibility: visible;
    transition: visibility .25s, opacity .25s;
}

.video__cursor--active > div {
    transform: translateY(0);
}

.video--playing .video__cursor > div {
    transform: translateY(-100%);
}
</style>
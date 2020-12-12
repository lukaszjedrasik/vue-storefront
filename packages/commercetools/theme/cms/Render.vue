<script>
import Vue from 'vue';
import { RenderContent } from '@vsf-enterprise/storyblok';
import Accordion from './Accordion';
import Alert from './Alert';
import Banner from './Banner';
import CallToAction from './CallToAction';
import Carousel from './Carousel';
import Editorial from './Editorial';
import Hero from './Hero';
import Heading from './Heading';
import Gallery from './Gallery';
import List from './List';
import Navigation from './Navigation';
import ProductCard from './ProductCard';
import Footer from './Footer';
// import ProductSlider from './ProductSlider';

export default Vue.extend({
  name: 'Render',
  components: {
    Accordion,
    Alert,
    Banner,
    CallToAction,
    Carousel,
    Editorial,
    Hero,
    Heading,
    Gallery,
    List,
    Navigation,
    ProductCard,
    // ProductSlider,
    Footer
  },
  ...RenderContent
});
</script>


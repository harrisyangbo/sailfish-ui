import DhInteraction from './src/interaction.vue';
import DhInteractionLogic from './src/interaction_logic';

export { DhInteraction, DhInteractionLogic };

export default {
  install(Vue) {
    Vue.component(DhInteraction.name, DhInteraction);
    Vue.component(DhInteractionLogic.name, DhInteractionLogic);
  }
};

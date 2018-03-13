import Enzyme from 'enzyme';
import EnzymeAdapterReact16 from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';

Enzyme.configure({adapter: new EnzymeAdapterReact16()});

global.shallow = Enzyme.shallow;
global.render = Enzyme.render;
global.mount = Enzyme.mount;
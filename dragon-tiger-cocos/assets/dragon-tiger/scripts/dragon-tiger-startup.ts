import Client from "dragon-tiger-client";
import mobx from "mobx";
import Observer from "observer";

Observer.configure({ default: { mobx, container: Client.container } });

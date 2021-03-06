module scene {
    export class MainScene extends es.Scene {
        constructor() {
            super();

            // this.addEntityProcessor(new SpawnerSystem(new Matcher()));
            this.astarTest();
            this.dijkstraTest();
            this.breadthfirstTest();
        }

        public async onStart() {
            let mapData = await es.TiledMapLoader.loadTmxMap(new es.TmxMap(), "title_json");
            let map = this.createEntity("map");
            let tiledMap = map.addComponent(new es.TiledMapRenderer(mapData)).setRenderLayer(1);
            console.log(mapData);

            // let sprite = new es.Sprite(RES.getRes("checkbox_select_disabled_png"));
            // this.createEntityAsync("bg").then(bg => {
            //     bg.addComponent(new component.PlayerController());
            //     bg.addComponent(new es.Mover());
            //     let spriteRenderer = bg.addComponent(new es.ScrollingSpriteRenderer(sprite)).setRenderLayer(0);
            //     // spriteRenderer.scrollX = -30;
            //     // bg.addComponent(new es.BoxCollider());

            //     this.camera.follow(bg, es.CameraStyle.lockOn);
            // });
            
            this.camera.position = new es.Vector2(300, 265);
            es.Core.debugRenderEndabled = true;
            this.scaleX = 0.5;
            this.scaleY = 0.5;
            // // bg.addComponent(new es.SpriteRenderer()).setSprite(sprite).setColor(0xff0000);

            // for (let i = 0; i < 20; i++) {
            //     let sprite = new es.Sprite(RES.getRes("checkbox_select_disabled_png"));
            //     let player2 = this.createEntity("bg");
            //     player2.addComponent(new es.SpriteRenderer()).setSprite(sprite).setRenderLayer(i);
            //     player2.position = new es.Vector2(30 * i, 30 * i);
            //     // player2.addComponent(new es.BoxCollider());
            // }


            let pool = new es.ComponentPool<component.SimplePooled>(component.SimplePooled);
            let c1 = pool.obtain();
            let c2 = pool.obtain();
            pool.free(c1);
            let c1b = pool.obtain();

            console.log(c1 != c2);
            console.log(c1 == c1b);

            let button = new eui.Button();
            button.label = "切换场景";
            this.addChild(button);
            button.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                es.Core.startSceneTransition(new es.FadeTransition(() => {
                    return new MainScene();
                }));
            }, this);
        }

        public breadthfirstTest() {
            let graph = new es.UnweightedGraph<string>();

            graph.addEdgesForNode("a", ["b"]); // a->b
            graph.addEdgesForNode("b", ["a", "c", "d"]); // b->a b->c b->d
            graph.addEdgesForNode("c", ["a"]); // c->a
            graph.addEdgesForNode("d", ["e", "a"]); // d->e d->a
            graph.addEdgesForNode("e", ["b"]); // e->b

            // 计算从c到e的路径
            let path = es.BreadthFirstPathfinder.search(graph, "c", "e");
            console.log(path);
        }

        public dijkstraTest() {
            let graph = new es.WeightedGridGraph(20, 20);

            graph.weightedNodes.push(new es.Vector2(3, 3));
            graph.weightedNodes.push(new es.Vector2(3, 4));
            graph.weightedNodes.push(new es.Vector2(4, 3));
            graph.weightedNodes.push(new es.Vector2(4, 4));

            let path = graph.search(new es.Vector2(3, 4), new es.Vector2(15, 17));
            console.log(path);
        }

        public astarTest() {
            let graph = new es.AstarGridGraph(30, 30);

            // graph.weightedNodes.push(new Vector2(3, 3));
            // graph.weightedNodes.push(new Vector2(3, 4));
            // graph.weightedNodes.push(new Vector2(4, 3));
            // graph.weightedNodes.push(new Vector2(4, 4));

            let startTime = egret.getTimer();
            let path = graph.search(new es.Vector2(1, 1), new es.Vector2(29, 29));
            console.log(egret.getTimer() - startTime);
        }
    }
}

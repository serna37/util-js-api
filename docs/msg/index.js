if (!("utilJsApi" in window)) window.utilJsApi = {};
window.utilJsApi.msg = async (msg, level = "info") => {
    const $ = v => document.querySelector(v);
    const $$ = (e = "div") => document.createElement(e);
    const DOM = str => new DOMParser().parseFromString(str, "text/html").body.firstElementChild;
    const attr = (e, att) => Object.entries(att).map(([k, v]) => e[k] = v);
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));
    const style = $$("style");
    attr(style, {"media": "screen", "type": "text/css"});
    style.appendChild(document.createTextNode(`
        @keyframes anime-fadein-right {
            0% {
                opacity: 0;
                transform: translateX(10px);
            }

            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes anime-fadeout-up {
            0% {
                opacity: 1;
                transform: translateY(0);
            }

            100% {
                opacity: 0;
                transform: translateY(-100px);
            }
        }

        .fadein-right {
            opacity: 0;
            animation-name: anime-fadein-right;
            animation-duration: 0.3s;
            animation-timing-function: ease-out;
            animation-fill-mode: forwards;
        }

        .fadeout-up {
            opacity: 1;
            animation-name: anime-fadeout-up;
            animation-duration: 0.3s;
            animation-timing-function: ease-out;
            animation-fill-mode: forwards;
        }

        .msg-wrap {
            position: fixed;
            inset: 400px 0px 1px 200px;
            margin: auto;
            width: 200px;
            height: 65px;
            padding: 10px;
            border-radius: 7px;
            background: gray;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        .msg-inner {
            width: 100%;
            height: 100%;
            border-radius: 7px;
            background: black;
            display: grid;
            grid-template-columns: 20% 80%;
        }

        .msg-icon {
            width: 80%;
            height: 80%;
            margin: 10px;
            font-size: 80px;
        }

        .msg-text-box {
            width: 90%;
            height: 80%;
            margin: 10px;
            display: flex;
            justify-content: left;
            align-items: flex-start;
            overflow: scroll;
        }

        .msg-text {
            font-size: 20px;
            word-break: break-all;
        }

        .info {
            color: green;
        }

        .warn {
            color: yellow;
        }

        .error {
            color: red;
        }
    `));
    document.head.appendChild(style);
    const link = $$("link");
    attr(link, {"rel": "stylesheet", "href": "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"});
    document.head.appendChild(link);
    const elem = DOM(`
        <div class="msg-wrap fadein-right">
            <div class="msg-inner">
                <div>
                    <span class="material-symbols-outlined msg-icon ${level}">
                        ${level == "info" ? "task_alt" : "error"}
                    </span>
                </div>
                <div class="msg-text-box">
                    <div class="msg-text ${level}">${msg}</div>
                </div>
            </div>
        </div>
    `);
    $("body").appendChild(elem);
    await sleep(1000).then(_ => elem.classList.add("fadeout-up"));
    await sleep(300).then(_ => [style, link, elem].forEach(v => v.remove()));
};

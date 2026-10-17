# SHA 自检 · 防漂移 · tip `adf04e44`

时刻：2026-10-17 07:49:30 +0800 Asia/Shanghai

| 产物 | sha16 | 全 sha256 |
|---|---|---|
| NEW class | `30bbb73e75c12fb5` | `30bbb73e75c12fb5853608bb20633a504f919bd30ad560f0cd50aa7397f2e470` |
| NEW xml | `958de353f30e6cae` | `958de353f30e6cae1adfc87f0b88ec4edc4b86697172bf14b7d434eb15c89cf1` |
| ORIG class | `f87b79c3ced64448` | `f87b79c3ced6444800f3e834dd872507b1bbc866105a5b2f41ee8fc55d950c4b` |
| ORIG xml | `a305b1d371af6551` | `a305b1d371af6551e252d1e541ab71c12b2fe1b0c79457c970817298f81fdfb6` |
| tip tgz（包外，不含目录内 tip-*.tgz 副本） | `43abc144ed27231d` | `43abc144ed27231d51cf11e3affc6bad9360d23ea65663057b5e40f37829e445` |

OUTER≡NESTED：class 四处同 `30bbb73e75c12fb5`；xml 四处同 `958de353f30e6cae`。

口径：先打包外 tgz 再算 sha，再将同字节 tip-*.tgz 拷入交件目录；包内副本不参与包外 sha。

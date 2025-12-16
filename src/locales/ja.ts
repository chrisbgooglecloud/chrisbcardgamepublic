import { Translation } from './types';

export const ja: Translation = {
    ui: {
        title: "System: Ascension",
        subtitle: "クラウド移行ローグライク",
        startButton: "移行開始",
        language: "言語",
        turn: "ターン",
        energy: "エナジー",
        block: "ブロック",
        drawPile: "山札",
        discardPile: "捨て札",
        exhaustPile: "廃棄",
        endTurn: "ターン終了",
        handFull: "手札がいっぱいです！",
        insufficientCompute: "計算リソース不足",
        victory: "移行完了！",
        defeat: "システムクラッシュ",
        rewards: "報酬",
        chooseCard: "カードを選択",
        skip: "スキップ",
        gold: "ゴールド",
        shop: "ベンダーAPI",
        buy: "購入",
        removeCard: "カード削除",
        leave: "退出",
        event: "イベント",
        rest: "システム修復",
        unknown: "不明なノード",
        battle: "戦闘",
        elite: "エリート脅威",
        boss: "ボス",
        map: "ネットワークマップ",
        deck: "デッキ",
        relics: "レリック",
        loading: "読み込み中...",
        modernizing: "モダナイズ中...",
        navigating: "ナビゲート中...",
        act: "アクト",
        navigation: "ナビゲーション",
        floor: "フロア",
        choosePath: "次のパスを選択",
        initiateTravel: "移動を開始",
        returnToRoot: "ルートに戻る",
        migrating: "次のノードへ移行中...",
        migrationSuccess: "移行成功",
        victoryMessage: "インフラストラクチャは完全にクラウドネイティブになりました。",
        defeatMessage: "クラッシュレポート: アクトで失敗",
        bandwidthCap: "帯域幅制限",
        launchDeadline: "ローンチ期限",
        turnsRemaining: "残りターン",
        refactoring: "レガシーコードをリファクタリング中...",
        migrationComplete: "移行完了。システムアセンション。",
        introVideo: "紹介ビデオ",
        closeVideo: "ビデオを閉じる"
    },
    logs: {
        modernizationProtocol: "モダナイゼーションプロトコル開始...",
        refactoredHand: "{old} (手札) をリファクタリング -> {new}",
        refactoredDeck: "{old} (デッキ) をリファクタリング -> {new}",
        refactoredDiscard: "{old} (捨て札) をリファクタリング -> {new}",
        systemOverclock: "システム完全モダナイズ！オーバークロック発動 (+5 HP)。",
        vendorConnected: "ベンダーAPIに接続しました。",
        visitedNode: "{node} を訪問しました。(自動解決)",
        repairedSystem: "システム修復 (+15 HP)",
        actInitiated: "アクト {act} 開始。新しいマップを生成しました。",
        enemyRevived: "🧟 {enemy} が {hp} HPで復活しました！",
        packetLoss: "📦 パケットロス！ {count} 枚のカードを捨てました！",
        sqlInjection: "⚠️ SQLインジェクション！ {count} 枚の破損カードがデッキに追加されました！",
        ransomware: "🔒 ランサムウェア！ {count} 枚のカードがロックされました！",
        fakeCard: "💀 偽カード！ 回復の代わりに {damage} ダメージを受けました！",
        heals: "{amount} HP回復。",
        revokedStatus: "ステータス権限を取り消しました。",
        handOptimized: "手札最適化 (+3 ステータス)。",
        deployedFromArchives: "アーカイブから {card} を展開しました。",
        discardedHand: "手札を捨てました。",
        addedToDiscard: "{card} を捨て札に追加しました。",
        powerActive: "パワー発動中。",
        opsSuite: "(Ops Suite: +2 HP)",
        generatedCard: "{card} を生成しました。",
        intentCancelled: "敵の意図をキャンセルしました。",
        endOfTurn: "ターン終了処理中...",
        hotfixApplied: "ホットフィックススクリプトがパッチを適用: 2ダメージ。",
        jittersDamage: "イライラにより {damage} ダメージ。",
        systemInitialized: "システム初期化。ネットワークマップ生成中...",
        installedRelic: "{relic} をインストールしました",
        boughtRelic: "{relic} を {cost}G で購入しました。",
        purchasedCard: "{card} を購入しました",
        boughtCard: "{card} を {cost}G で購入しました。",
        cardRemoved: "カード削除",
        removedCardLog: "{cost}G でカードを削除しました。",
        drawsCards: "{count} 枚ドロー。",
        analyzedData: "データ分析 (3枚ドロー、2枚捨てる)。",
        gainsBlock: "{amount} ブロックを獲得。",
        reflectsDamage: "次の {amount} ダメージを反射。",
        dealtDamage: "{amount} ダメージを与えました。",
        thornsDamage: "⚡ 静電気ショック！ {amount} の棘ダメージを受けました。",
        deepFakeMimic: "🦾 ディープフェイクがあなたの最後の攻撃 ({amount} ダメージ) を模倣！",
        spannerShield: "クリティカル: Spannerシールド発動！ HP 10で生存。",
        integrityBreach: "整合性侵害！ -{amount} HP。",
        damageBlocked: "ダメージをブロック。",
        enemyGainsBlock: "{amount} ブロックを獲得。",
        enemySummons: "依存関係を2つ召喚！",
        spaghettiTangled: "スパゲッティモンスターが {count} 枚のレガシーコードをデッキに絡ませました！",
        reshuffledDiscard: "捨て札をリシャッフルしました。",
        handFullBurned: "手札がいっぱいです！ {card} を燃やしました。",
        noCardsToDraw: "引くカードがありません！",
        drawnLegacyCode: "レガシーコードを引きました！ 何かが壊れました。",
        discardedTarget: "{card} を捨てました。",
        packetFilterInit: "パケットフィルター初期化: +8 ブロック。",
        encounterDetected: "エンカウンター検出: {enemy}",
        eventTriggered: "イベント発生: {event}",
        nubusPlays: "Nubusは {card} をプレイ。",
        algorithmOptimized: "アルゴリズムがこの攻撃を最適化 (2倍ダメージ)！",
        invulnerable: "{enemy} は無敵です！",
        dependencyRemoved: "(依存関係を1つ削除)",
        attackBlocked: "攻撃が依存関係によってブロックされました！",
        missDodged: "ミス！ {enemy} は攻撃を回避しました。",
        launchDeadline: "ローンチ期限到達。成功。",
        singularityConsumed: "⚡ シンギュラリティがデッキから {card} を消費しました！",
        raceCondition: "⚡ レースコンディション発生！ ボーナスダメージ！",
        hallucinationShuffled: "👻 ハルシネーションが {count} 枚の怪しい回復カードをデッキに混ぜました...",
        infiniteLoop: "♾️ 無限ループ！ 次のターンも同じ手札を引きます！",
        usesDescription: "{description} を使用。",
        blackBoxHums: "ブラックボックスが唸っている... まだ何も起こらない。",
        heatBuildsUp: "熱が蓄積... (次ターン -{amount} エナジー)",
        overfitDetected: "📊 オーバーフィットがパターンを検出！ 反復により +2 筋力！",
        turnStart: "ターン {turn} 開始。",
        infiniteLoopRedraw: "♾️ 無限ループにより同じ手札を再描画！",
        encounterNarrative: "Nubusは{theme}で{enemy}と交戦中。"
    },
    themes: {
        act1: "埃っぽいサーバークローゼット",
        act2: "リフト＆シフトのリンボ",
        act3: "シンギュラリティ・コア"
    },
    combatLog: {
        title: "クラウド運用ログ",
        minimize: "最小化",
        expand: "展開",
        waiting: "システム初期化完了。入力待ち..."
    },
    gemini: {
        name: "Gemini"
    },
    mapNodes: {
        battle: "標準セキュリティパトロール。ウォーミングアップに最適。",
        elite: "高トラフィックノード。危険だが、実入りが良い。",
        event: "不明な信号を検出。注意して進んでください。",
        shop: "ベンダーAPI利用可能。ここでクレジットを使用。",
        rest: "システムメンテナンスウィンドウ。修復と最適化。",
        boss: "重大な脅威を検出。起動準備。",
        unknown: "不明なセクター。"
    },
    classes: {
        'senior-engineer': {
            name: "シニアエンジニア",
            description: "過労気味だが効率的。自動化サービスを展開して仕事を任せる。"
        },
        'security-guardian': {
            name: "セキュリティガーディアン",
            description: "ゼロトラストアーキテクチャ。大量のブロックを構築し、ダメージを攻撃者に反射する。"
        },
        'data-scientist': {
            name: "データサイエンティスト",
            description: "戦闘中にモデルをトレーニングする。カードは最初は弱いが、プレイするほど永続的に強化される。"
        }
    },
    cards: {
        // Legacy
        'percussive-maintenance': { name: "衝撃療法", description: "6ダメージを与える。", flavorText: "\"動かないなら、もっと強く叩け。\"" },
        'duct-tape': { name: "ダクトテープパッチ", description: "5ブロックを得る。", flavorText: "\"見た目は悪いが、なんとかなる。たぶん。\"" },
        'reboot': { name: "再起動", description: "HPを3回復する。ターンを即座に終了する。", flavorText: "\"再起動してみましたか？\"" },
        'coffee-break': { name: "コーヒーブレイク", description: "カードを2枚引く。捨て札に「イライラ」を1枚加える。", flavorText: "\"あと5分だけ...\"" },
        'spaghetti-code': { name: "スパゲッティコード", description: "4-8ダメージを与える（ランダム）。", flavorText: "\"どう動いてるか分からないから、触るな。\"" },
        'hard-drive-spin': { name: "HDDスピンアップ", description: "12ダメージを与える。1ターンのウォームアップが必要（保持）。", flavorText: "\"カチッ...ウィーン...カチッ...\"" },

        // Cloud
        'compute-engine': { name: "コンピュートエンジン", description: "9ダメージを与える。", flavorText: "\"純粋な馬力。飾り気はない。\"" },
        'cloud-storage': { name: "ストレージバケット", description: "6ブロックを得る。カードを1枚保持する。", flavorText: "\"無限の保持ポリシー。\"" },
        'vpc-firewall': { name: "VPCファイアウォール", description: "8ブロックを得る。", flavorText: "\"全てのインバウンドを拒否。私以外。\"" },
        'cloud-functions': { name: "クラウドファンクション", description: "3ダメージを与える。カードを1枚引く。", flavorText: "\"小さく、速く、安い。\"" },
        'load-balancer': { name: "ロードバランサー", description: "手札を全て捨てる。カードを4枚引く。", flavorText: "\"トラフィックを再分配中。\"" },
        'operations-suite': { name: "オペレーションスイート", description: "パワーをプレイするたび、HPを2回復する。", flavorText: "\"可観測性がダウンタイムを防ぐ。\"" },
        'pub-sub': { name: "Pub/Subスクリーム", description: "全ての敵に8ダメージを与える。", flavorText: "\"一つのメッセージ、多数の購読者。\"" },
        'preemptible-vm': { name: "プリエンプティブVM", description: "14ダメージを与える。廃棄。エセリアル。", flavorText: "\"安いパワーだが、消えるかもしれない。\"" },
        'cloud-armor': { name: "クラウドアーマー", description: "12ブロックを得る。このターン、3ダメージを反射する。", flavorText: "\"DDOS保護有効。\"" },
        'dataflow': { name: "データフローパイプライン", description: "ターン開始時：カードを+1枚引く。", flavorText: "\"リアルタイムのストリーミング分析。\"" },
        'looker-dashboard': { name: "Lookerダッシュボード", description: "カードを3枚引き、ランダムなカードを2枚捨てる。", flavorText: "\"結果を可視化する。\"" },
        'iam-policy': { name: "IAMポリシー", description: "手札から全てのデバフ/状態異常カードを取り除く。", flavorText: "\"アクセス権限を取り消しています。\"" },
        'bigquery-blast': { name: "BigQueryブラスト", description: "15ダメージ + 捨て札の枚数×5ダメージを与える。", flavorText: "\"ペタバイト規模の破壊。\"" },
        'gke-swarm': { name: "GKEスウォーム", description: "ターン終了時：敵に5ダメージを与える。", flavorText: "\"自動化されたオーケストレーション。\"" },
        'apigee': { name: "Apigeeゲートウェイ", description: "敵の意図をキャンセルする。廃棄。", flavorText: "\"レート制限を超過しました。再試行してください。\"" },
        'spanner-shield': { name: "Spannerシールド", description: "HPが0になった時、HP10で生き残る（1回のみ）。", flavorText: "\"グローバルな一貫性は死なないことを意味する。\"" },
        'anthos-hybrid': { name: "Anthosハイブリッド", description: "捨て札からランダムなカードを1枚プレイする（コスト0）。", flavorText: "\"どこでも実行。どこでも展開。\"" },

        // Vertex
        'the-prompt': { name: "プロンプト", description: "ランダムなクラウドカードを1枚手札に加える。コストは0。", flavorText: "\"必要なものは何でも夢見ることができる。\"" },
        'model-fine-tuning': { name: "モデルファインチューニング", description: "手札の全てのカードを強化する（+3 ダメージ/ブロック）。", flavorText: "\"パフォーマンス向上のための重み調整。\"" },
        'grounding': { name: "グラウンディング", description: "20ダメージを与える。ブロック不可。", flavorText: "\"事実確認済み。\"" },
        'multimodal': { name: "マルチモーダル入力", description: "全エナジーを消費。Xダメージを与え、Xブロックを得て、X枚引く。", flavorText: "\"テキスト、画像、動画―全て処理できる。\"" },

        // Status/Curse
        'jitters': { name: "イライラ", description: "ターン終了時、1ダメージを受ける。", flavorText: "\"カフェインの摂りすぎ...\"" },
        'latency': { name: "レイテンシ", description: "何もしない。削除するには2エナジーが必要。", flavorText: "\"読み込み中...\"" },
        'legacy-code': { name: "レガシーコード", description: "引いた時、ランダムなカードを1枚捨てる。", flavorText: "\"また何かが壊れた。\"" },
        'memory-leak': { name: "メモリリーク", description: "プレイ不可。手札にある間、最大エナジー-1。", flavorText: "\"RAMはどこへ行った？\"" }
    },
    enemies: {
        'dust-bunny': { name: "ダストバニー", description: "埃と静電気の浮遊球体。（コモン）" },
        'spaghetti-monster': { name: "スパゲッティモンスター", description: "ケーブルの混沌とした結び目。デッキをゴミで埋める。" },
        'zombie-process': { name: "ゾンビプロセス", description: "粘液を垂らす腐ったターミナルウィンドウ。（コモン）" },
        'spicy-fan': { name: "スパイシーファン", description: "過熱したCPUファン。攻撃時に1エナジーを燃やす。" },
        'crt-golem': { name: "CRTゴーレム", description: "古いモニターでできた巨大な野獣。（エリート）" },
        'monolith': { name: "モノリス", description: "錆びたメインフレームタワー。（ボス）" },
        'packet-loss': { name: "パケットロス", description: "狂乱したピクセル郵便配達人。強制的に捨てさせる。" },
        'race-condition': { name: "レースコンディション", description: "互いに衝突する2人のネオンランナー。" },
        '404-phantom': { name: "404ファントム", description: "シーツを被った幽霊。高い回避率。" },
        'sql-injector': { name: "SQLインジェクター", description: "光る緑色の括弧のサイバーワーム。" },
        'ransomware-knight': { name: "ランサムウェアナイト", description: "南京錠の鎧を着た黒騎士。（エリート）" },
        'bottleneck': { name: "ボトルネック", description: "巨大なトラフィックコーン。プレイ枚数を3枚に制限。（ボス）" },
        'hallucination': { name: "ハルシネーション", description: "揺らめくNubusのクローン。偽のカードを混ぜる。" },
        'overfit': { name: "オーバーフィット", description: "レーザーキャリパスを持つロボット。正確なダメージ。" },
        'infinite-loop': { name: "無限ループ", description: "自分の尾を食べる蛇。同じ手札を再配布する。" },
        'black-box': { name: "ブラックボックス", description: "不気味な浮遊キューブ。意図不明。" },
        'deep-fake': { name: "ディープフェイク", description: "グリッチのあるシェイプシフター。（エリート）" },
        'singularity': { name: "シンギュラリティ", description: "暗黒の嵐雲Nubus。（ボス）" }
    },
    events: {
        'the-pivot': {
            title: "ピボット",
            narrative: "静寂を破るSlackの通知音。CEOからだ。「チームのみんな、Web3の記事を読んだ。今日中にWeb3企業になる必要がある。トースターのソフトを作ってるなんて関係ない。ピボットだ！」",
            options: {
                'just-build-it': { label: "ただ作る", description: "75ゴールドを得る。「NFT統合」の呪いを追加。" },
                'push-back': { label: "反発する", description: "8HPを失う。カードを1枚削除。" },
                'ignore': { label: "通知を無視", description: "何もせず立ち去る。" }
            }
        },
        'legacy-server': {
            title: "レガシーサーバー",
            narrative: "12年間再起動されていないサーバーを見つけた。ダストバニーに覆われているが、照明を維持する重要なスクリプトを実行している。恐ろしい異音を立てている。",
            options: {
                'percussive': { label: "衝撃療法", description: "4ダメージを受ける。ランダムなカードを1枚強化。" },
                'decommission': { label: "廃止する", description: "デッキからカードを1枚削除。" },
                'back-away': { label: "ゆっくり離れる", description: "5HPを回復。" }
            }
        },
        'headhunter': {
            title: "ヘッドハンター",
            narrative: "リクルーターがDMを送ってきた。「やあロックスター！🚀 私たちは破壊的空間を破壊しています。ステルスモード。10倍エンジニア限定。会社のデータを売ってくれませんか？」",
            options: {
                'sell-data': { label: "データを売る", description: "最大HPを10失う。100ゴールドを得る。" },
                'reject': { label: "オファーを断る", description: "エリート敵と戦う。" }
            }
        }
    },
    relics: {
        'hotfix-script': { name: "ホットフィックススクリプト", description: "ターン終了時、ランダムな敵に2ダメージを与える。" },
        'packet-filter': { name: "パケットフィルター", description: "戦闘開始時、8ブロックを得る。" },
        'the-algorithm': { name: "アルゴリズム", description: "プレイする3枚目の攻撃カードは2倍のダメージを与える。" }
    }
};

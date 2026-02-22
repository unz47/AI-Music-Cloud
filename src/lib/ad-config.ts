// Google AdSense パブリッシャーID（審査通過後に環境変数 NEXT_PUBLIC_ADSENSE_PUB_ID に設定）
export const ADSENSE_PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID || "";

// AdSenseが有効かどうか
export const ADSENSE_ENABLED = !!ADSENSE_PUB_ID;

// Suno API アフィリエイトリンク（Rewardful経由 - 紹介者の月額30%報酬）
export const SUNO_AFFILIATE_URL = "https://www.musicapi.ai/?via=unz47";

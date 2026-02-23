import type { Metadata } from "next";

export const metadata: Metadata = { title: "プライバシーポリシー" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 text-text-secondary">
      <h1 className="mb-8 text-2xl font-bold text-text-primary">プライバシーポリシー</h1>
      <p className="mb-4 text-xs text-text-tertiary">最終更新日: 2026年2月23日</p>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-text-primary">1. 収集する情報</h2>
        <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2">
          <li><strong>アカウント情報:</strong> Googleログイン時に提供される名前、メールアドレス、プロフィール画像</li>
          <li><strong>投稿コンテンツ:</strong> アップロードされた音楽ファイル、アートワーク、楽曲情報</li>
          <li><strong>利用データ:</strong> 再生回数、いいね、フォロー等のアクティビティ</li>
          <li><strong>アクセスログ:</strong> IPアドレス、ブラウザ情報、アクセス日時（サーバーログとして自動的に記録）</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-text-primary">2. 情報の利用目的</h2>
        <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2">
          <li>本サービスの提供・運営・改善</li>
          <li>ユーザーアカウントの管理・認証</li>
          <li>ユーザーサポートの提供</li>
          <li>不正利用の検知・防止</li>
          <li>利用状況の統計・分析（個人を特定しない形で）</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-text-primary">3. 情報の共有</h2>
        <p className="text-sm leading-relaxed">
          ユーザーの個人情報を第三者に販売・貸与することはありません。ただし、以下の場合を除きます：
        </p>
        <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2 mt-2">
          <li>法令に基づく開示要求があった場合</li>
          <li>ユーザーの同意がある場合</li>
          <li>本サービスの運営に必要なインフラ提供者（AWS等）への業務委託に伴う場合</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-text-primary">4. 公開される情報</h2>
        <p className="text-sm leading-relaxed">
          以下の情報は本サービス上で他のユーザーに公開されます：
        </p>
        <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2 mt-2">
          <li>表示名（Googleアカウントの名前）</li>
          <li>プロフィール画像</li>
          <li>投稿した楽曲とその関連情報</li>
          <li>いいね数、フォロワー数、フォロー数</li>
        </ul>
        <p className="mt-2 text-sm leading-relaxed">
          メールアドレスは他のユーザーに公開されません。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-text-primary">5. データの保管</h2>
        <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2">
          <li>データはAmazon Web Services（AWS）の東京リージョン（ap-northeast-1）のサーバーに保管されます。</li>
          <li>適切なセキュリティ対策（通信の暗号化、アクセス制御等）を講じていますが、インターネット上の通信の完全な安全性を保証するものではありません。</li>
          <li>アカウント削除を希望する場合、投稿コンテンツおよびアカウント情報は合理的な期間内に削除されます。</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-text-primary">6. Cookieの使用</h2>
        <p className="text-sm leading-relaxed">
          本サービスでは以下の目的でCookieを使用します：
        </p>
        <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2 mt-2">
          <li>認証状態の維持（セッション管理）</li>
          <li>将来的に広告配信サービス（Google AdSense等）を導入した場合、広告の最適化のためにサードパーティCookieが使用される場合があります</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-text-primary">7. ユーザーの権利</h2>
        <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2">
          <li>自身が投稿したコンテンツをいつでも削除できます。</li>
          <li>アカウントの削除を要求できます。</li>
          <li>自身の個人情報の開示・訂正・削除を要求できます。</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-text-primary">8. 未成年者のプライバシー</h2>
        <p className="text-sm leading-relaxed">
          本サービスは13歳未満の方を対象としていません。13歳未満の方の個人情報を意図的に収集することはありません。13歳未満の方が本サービスを利用していることが判明した場合、該当アカウントおよびデータを削除します。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-text-primary">9. ポリシーの変更</h2>
        <p className="text-sm leading-relaxed">
          本ポリシーは予告なく変更される場合があります。重要な変更がある場合は、本サービス上で通知するよう努めます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-text-primary">10. お問い合わせ</h2>
        <p className="text-sm leading-relaxed">
          プライバシーに関するお問い合わせは、本サービス内のReportフォームよりご連絡ください。
        </p>
      </section>
    </div>
  );
}

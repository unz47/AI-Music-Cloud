import type { Metadata } from "next";

export const metadata: Metadata = { title: "利用規約" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 text-text-secondary">
      <h1 className="mb-8 text-2xl font-bold text-text-primary">利用規約</h1>
      <p className="mb-8 text-xs text-text-tertiary">最終更新日: 2026年2月23日</p>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-text-primary">1. サービスの概要</h2>
        <p className="text-sm leading-relaxed">
          AI Music Cloud（以下「本サービス」）は、AI生成音楽の投稿・共有・視聴を目的としたプラットフォームです。本サービスを利用することにより、本利用規約に同意したものとみなされます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-text-primary">2. アカウント</h2>
        <p className="text-sm leading-relaxed">
          本サービスの一部機能を利用するにはGoogleアカウントによるログインが必要です。アカウントの管理はユーザー自身の責任で行ってください。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-text-primary">3. コンテンツの投稿とAI生成音楽の権利</h2>
        <p className="mb-3 text-sm leading-relaxed">
          本サービスに音楽を投稿する際は、以下の条件を遵守してください。
        </p>

        <h3 className="mb-2 text-sm font-semibold text-text-primary">3.1 投稿可能なコンテンツ</h3>
        <ul className="mb-4 list-disc pl-5 text-sm leading-relaxed space-y-2">
          <li>ユーザー自身がAIツール（Suno、Udio、AIVA、Soundraw等）を使用して生成した音楽に限ります。</li>
          <li>他者が生成したAI音楽、既存の楽曲、または権利者の許諾を得ていないコンテンツの投稿は禁止します。</li>
        </ul>

        <h3 className="mb-2 text-sm font-semibold text-text-primary">3.2 AI生成音楽の著作権について</h3>
        <p className="mb-3 text-sm leading-relaxed">
          AI生成音楽の著作権は、各国の法律およびAIツールの利用規約により異なります。投稿者は以下の点を理解した上で投稿してください。
        </p>
        <ul className="mb-4 list-disc pl-5 text-sm leading-relaxed space-y-2">
          <li>
            <strong>日本の著作権法:</strong> AIが自律的に生成したコンテンツは、人間の「創作的寄与」がない場合、著作物として認められない可能性があります。ただし、プロンプトの工夫や編集など人間の創作的関与がある場合は、著作権が認められる余地があります。
          </li>
          <li>
            <strong>米国著作権法:</strong> 米国著作権局は、AIが生成した部分には著作権を認めない立場を示しています。人間が実質的に創作に関与した部分のみが保護対象となります。
          </li>
          <li>
            <strong>AIツールの利用規約:</strong> 各AIツールにより、生成物の権利帰属や商用利用の可否が異なります（下記参照）。投稿者は利用したAIツールの規約を遵守する責任を負います。
          </li>
        </ul>

        <h3 className="mb-2 text-sm font-semibold text-text-primary">3.3 主要AIツールの権利関係（参考情報）</h3>
        <p className="mb-3 text-xs text-text-tertiary">
          ※ 以下は2026年2月時点の情報です。最新の規約は各サービスの公式サイトをご確認ください。
        </p>
        <div className="overflow-x-auto rounded-lg border border-border-default">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-default bg-surface-2">
                <th className="px-4 py-2.5 text-left font-semibold text-text-primary">AIツール</th>
                <th className="px-4 py-2.5 text-left font-semibold text-text-primary">無料プラン</th>
                <th className="px-4 py-2.5 text-left font-semibold text-text-primary">有料プラン</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-border-default">
                <td className="px-4 py-2.5 font-medium">Suno</td>
                <td className="px-4 py-2.5">所有権はSunoに帰属。非商用利用のみ。後から有料プランに変更しても、無料時に生成した楽曲は商用利用不可。</td>
                <td className="px-4 py-2.5">ユーザーに所有権が付与され、商用利用可能。ただし著作権の法的保護は保証されない。</td>
              </tr>
              <tr className="border-b border-border-default">
                <td className="px-4 py-2.5 font-medium">Udio</td>
                <td className="px-4 py-2.5">2025年10月のUMGとの和解以降、ダウンロード機能が制限。利用規約が大幅に変更されたため、最新の公式規約を要確認。</td>
                <td className="px-4 py-2.5">UMG・WMGとのライセンス契約に基づく新サービスが2026年以降提供予定。</td>
              </tr>
              <tr className="border-b border-border-default">
                <td className="px-4 py-2.5 font-medium">AIVA</td>
                <td className="px-4 py-2.5">AIVAが著作権を保持。非商用利用のみ。</td>
                <td className="px-4 py-2.5">Pro以上でユーザーに著作権が譲渡され、商用利用可能。</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-medium">Soundraw</td>
                <td className="px-4 py-2.5">ダウンロード不可。</td>
                <td className="px-4 py-2.5">商用利用可能（ロイヤリティフリー）。</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="mb-2 mt-4 text-sm font-semibold text-text-primary">3.4 レコード会社との訴訟について</h3>
        <p className="text-sm leading-relaxed">
          2024年、主要レコード会社（UMG、Sony Music、WMG）がSunoおよびUdioに対し、AIの学習データに著作権楽曲を無断使用したとして訴訟を提起しました。2025年後半にUMG・WMGとUdio/Sunoの間で和解・ライセンス契約が成立しましたが、Sony Musicとの訴訟は継続中です。今後の判決や法改正により、AI生成音楽の権利関係が変更される可能性があります。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-text-primary">4. 投稿者の責任</h2>
        <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2">
          <li>投稿者は、投稿するコンテンツが利用したAIツールの利用規約に準拠していることを保証するものとします。</li>
          <li>無料プランで生成した楽曲を商用利用が禁止されているにもかかわらず投稿した場合、その責任は投稿者が負います。</li>
          <li>他者の著作権、商標権、肖像権、パブリシティ権、プライバシー権を侵害するコンテンツの投稿は禁止します。</li>
          <li>既存アーティストの声を模倣・クローンしたコンテンツの投稿は禁止します。</li>
          <li>違法、有害、脅迫的、虐待的、嫌がらせ、中傷的、わいせつなコンテンツの投稿は禁止します。</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-text-primary">5. 本サービス上でのライセンス</h2>
        <p className="text-sm leading-relaxed">
          投稿されたコンテンツの権利は投稿者に帰属しますが、本サービス上での配信・表示・ストリーミングに必要な範囲で、非独占的なライセンスを本サービスに付与するものとします。投稿者はいつでもコンテンツを削除でき、削除後は本ライセンスも終了します。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-text-primary">6. 禁止事項</h2>
        <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2">
          <li>本サービスの不正利用、サーバーへの過度な負荷をかける行為</li>
          <li>他のユーザーへのなりすまし</li>
          <li>スパム、マルウェアの配布</li>
          <li>本サービスのリバースエンジニアリング</li>
          <li>自動化ツールによる大量アップロード・スクレイピング</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-text-primary">7. コンテンツの削除・DMCA対応</h2>
        <p className="text-sm leading-relaxed">
          本サービスは、本規約に違反するコンテンツを事前の通知なく削除する権利を有します。権利者からの著作権侵害の申し立て（DMCAテイクダウン通知等）があった場合、該当コンテンツを速やかに削除します。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-text-primary">8. 免責事項</h2>
        <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2">
          <li>本サービスは「現状のまま」提供され、いかなる保証も行いません。</li>
          <li>ユーザーが投稿したコンテンツに関する法的責任はユーザー自身が負います。</li>
          <li>AI生成音楽の著作権に関する法的助言は提供しません。必要に応じて専門家にご相談ください。</li>
          <li>本サービスの利用により生じた損害について、運営者は一切の責任を負いません。</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-text-primary">9. 規約の変更</h2>
        <p className="text-sm leading-relaxed">
          AI生成コンテンツに関する法律・判例は急速に変化しています。本規約は予告なく変更される場合があります。変更後も本サービスを利用した場合、変更後の規約に同意したものとみなされます。
        </p>
      </section>
    </div>
  );
}

import React, {useEffect} from 'react';

declare const APPID: string; // esbuild DEFINE = name of application folder

const text = [`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus asperiores aut corporis deleniti
	dolorum enim et ipsam labore libero maxime minus nisi officia quam, qui quis quisquam, ratione tenetur vel.`,
	`Ad iure quasi reprehenderit. At beatae blanditiis esse, est ex explicabo illo ipsum magni odit officiis quas,
	quibusdam quo reiciendis, rem repudiandae soluta voluptatibus voluptatum! Impedit itaque nostrum tempora
	voluptatum!`,
	`Ad dolores, earum, illo iure quasi quibusdam quidem quis recusandae sed soluta vero voluptas? Accusantium atque
	consectetur consequuntur, doloremque dolores eius illo laudantium magnam magni nam quasi ratione, reiciendis
	rerum.`,
	`Aperiam distinctio dolorum eaque eos error eum ipsum labore minus mollitia nihil nobis officia, quas quasi quos
	reiciendis sit, voluptate. Animi asperiores assumenda autem cumque dolores error illo porro quas!`,
	`Accusamus adipisci at consequuntur cum impedit ipsam libero molestias nisi pariatur perspiciatis quasi quibusdam
	tenetur ut vitae, voluptatem! Commodi consectetur eius eum hic laboriosam nesciunt pariatur provident tenetur ut
	vel?`,
	`Aliquam beatae delectus dolore earum eius eveniet excepturi explicabo id ipsa molestias, nemo nihil nostrum officia
	pariatur porro provident quas quisquam quo reiciendis saepe tenetur voluptate voluptates! Nostrum, saepe
	soluta.`,
	`Esse saepe sit voluptate. At commodi cumque distinctio ex hic illum molestiae mollitia nobis praesentium
	reiciendis, repellendus repudiandae sapiente ut? Consectetur porro qui quidem reiciendis! Aperiam cum dicta officiis
	quibusdam!`,
	`Accusamus beatae cumque, cupiditate ea eos fuga iure non optio quod voluptate. Ad delectus ea enim, et eum in minus
	perspiciatis quae quidem quo repellendus temporibus tenetur unde veniam voluptate!`,
	`Nam, rem tempora. Autem consectetur deserunt est fugit laboriosam mollitia nam nesciunt reiciendis veritatis.
	Accusamus autem beatae corporis cupiditate itaque iusto, laborum necessitatibus non nostrum praesentium qui quod
	repellendus, reprehenderit!`,
	`Adipisci dicta illo in nulla praesentium, quo tempore veniam voluptas. Aliquam commodi consectetur deleniti est
	explicabo magnam molestiae placeat qui quos saepe sint, voluptatibus. Eveniet impedit possimus quas ut
	voluptate.`];

export const ViewText: React.FC = () => {
	useEffect(() => {
		console.log('Mounting: ViewText [' + APPID + '/text]');
		return () => {
			console.log('Unmounting: ViewText [' + APPID + '/text]');
		};
	}, []);

	return <div className='_m_view_text'>
		<h3>Wise words</h3>
		<p>This is view "text" from micro-frontend application "{APPID}".</p>

		{text.map((p, idx) => <p key={idx}>{p}</p>)}
	</div>;
}

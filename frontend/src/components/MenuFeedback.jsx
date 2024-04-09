import React from 'react'
const MenuFeedBack = () => {
	return (
		<div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12 border border-gray-300">
			
			<div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md bg-white border border-gray-300 rounded-lg">

				<h1 className="text-center text-2xl mb-5">Deixe seu comentário sobre o produto</h1>

				<form className="bg-white shadow w-full rounded-lg divide-y divide-gray-300 border boder-gray-300">
					<div className="px-9 py-12">

						<label className="font-semibold text-sm text-gray-600 pb-1 block">Comentário</label>

						<textarea className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"></textarea>
						
						<button type="submit" className="transition duration-200 bg-purple-500 hover:bg-purple-700 focus:bg-purple-700 
						focus:shadow-sm focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm
						shadow-sm hover:shadow-md font-semibold text-center inline-block">
							Postar Comentário
						</button>

					</div>
				</form>
			</div>
		</div>
	);
};

export default MenuFeedBack;

import { BadgeCheck, HandCoins, Headset, Trophy } from "lucide-react";

const data = [
  {
    id: 1,
    title: 'High Quality',
    description: 'Crafted from top materials',
    icon: <Trophy size={'auto'}/>
  },
  {
    id: 2,
    title: 'Warranty Protection',
    description: 'Over 2 years',
    icon: <BadgeCheck size={'auto'}/>
  },
  {
    id: 3,
    title: 'Free Shipping',
    description: 'Order over 150 $',
    icon: <HandCoins size={'auto'}/>
  },
  {
    id: 4,
    title: '24 / 7 Support',
    description: 'Dedicated support',
    icon: <Headset size={'auto'}/>
  }

]
const InformComponent = () => {

  return (
    <div className="py-10 md:py-[100px] px-5 md:px-13 bg-[#FAF3EA] flex flex-col items-center  ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-20 ">
        {data.map((item) => (
          <div key={item.id} className="flex flex-col md:flex-row gap-2.5">
            <span className="size-8 md:size-10 lg:size-15">{item.icon}</span>
            <div className="space-y-0.5">
              <p className="md:text-lg lg:text-2xl font-semibold">{item.title}</p>
              <p className="text-gray_3 text-sm lg:text-xl">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
        
      </div>
  )
}
export default InformComponent